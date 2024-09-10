import React from 'react'
import AdminVideo from '@/components/admin/admin.videos/admin.videos.table'
import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";
interface IProps {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
const Videos = async (props: IProps) => {
    const current = props?.searchParams?.current ?? 1;
    const pageSize = props?.searchParams?.pageSize ?? 10;
    const session = await auth();
    const res = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/videos`,
        method: "GET",
        queryParams: {
            current,
            pageSize
        },
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
        nextOption: {
            next: { tags: ['list-videos'] }
        }
    })
    return (
        <div>
            <AdminVideo
                videos={res?.data?.results ?? []}
                meta={res?.data?.meta}
            />
        </div>
    )
}

export default Videos