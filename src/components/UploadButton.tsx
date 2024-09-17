'use client'

import { Upload } from 'lucide-react'
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary'

import { useResources } from '@/hooks/use-resources'
import { CloudinaryResources } from '@/types/cloudinary'

const UploadButton = () => {
  const { addResources } = useResources({
    disableFetch: true,
  })
  function handleOnSuccess(results: CloudinaryUploadWidgetResults) {
    addResources([results.info as CloudinaryResources])
  }

  return (
    <CldUploadButton
      className='flex gap-2 items-center'
      signatureEndpoint='/api/sign-cloudinary-params'
      options={{
        autoMinimize: true,
        tags: [String(process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG)],
      }}
      uploadPreset='library_test'
      onSuccess={handleOnSuccess}
    >
      <Upload className='w-4 h-4' /> Upload
    </CldUploadButton>
  )
  // return <CldUploadButton uploadPreset='library_test' />
}

export default UploadButton
