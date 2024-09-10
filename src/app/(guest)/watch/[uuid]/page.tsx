'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const VideoJS = dynamic(() => import('../../../../components/videojs/VideoJS'), { ssr: false })

type VideoJSOptions = {
  autoplay?: boolean;
  controls?: boolean;
  responsive?: boolean;
  fluid?: boolean;
  sources?: {
    src: string;
    type: string;
  }[];
}

export default function WatchVideo() {
  const params = useParams()
  const uuid = params?.uuid as string
  const [videoJsOptions, setVideoJsOptions] = useState<VideoJSOptions | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [videoTitle, setVideoTitle] = useState('Watch Video')

  useEffect(() => {
    if (uuid) {
      setVideoJsOptions({
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
          src: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/videos/stream/${uuid}`,
          type: 'video/mp4'
        }]
      })

      // Fetch video title if you have an API for it
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/videos/${uuid}`)
        .then(res => res.json())
        .then(data => setVideoTitle(data.title))
        .catch(err => setError('Failed to load video information'))
    }
  }, [uuid])

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!videoJsOptions) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>{videoTitle}</title>
      </Head>
      <div>
        <h1>{videoTitle}</h1>
        <VideoJS options={videoJsOptions} />
      </div>
    </>
  )
}