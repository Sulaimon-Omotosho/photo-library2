import { useQuery, useQueryClient } from '@tanstack/react-query'

import { CloudinaryResources } from '@/types/cloudinary'

interface UseResources {
  initialResources?: Array<CloudinaryResources>
  disableFetch?: boolean
  tag?: string
}

export function useResources(options?: UseResources) {
  const queryClient = useQueryClient()
  const { disableFetch = false } = options || {}

  const { data: resources } = useQuery({
    queryKey: ['resources', options?.tag],
    queryFn: async () => {
      const { data } = await fetch('/api/resources').then((r) => r.json())
      return data
    },
    initialData: options?.initialResources,
    enabled: !disableFetch,
  })

  function addResources(results: Array<CloudinaryResources>) {
    queryClient.setQueryData(
      ['resources', String(process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG)],
      (old: Array<CloudinaryResources>) => {
        return [...results, ...old]
      }
    )
    queryClient.invalidateQueries({
      queryKey: [
        'resources',
        String(process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG),
      ],
    })
    // console.log('addResources Results', results)
  }

  return {
    resources,
    addResources,
  }
}
