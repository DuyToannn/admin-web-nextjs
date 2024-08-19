import Verify from '@/components/auth/vetify'
import React from 'react'

const VerifyPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  return (
    <>
      <Verify id={id} />
    </>
  )
}

export default VerifyPage