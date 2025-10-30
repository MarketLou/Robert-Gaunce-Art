/**
 * Composable for fetching all products/artworks
 * This will fetch data on the server (SSR) for SEO benefits
 * Can also be used client-side for dynamic updates
 */

export const useProducts = () => {
  console.log('🔶 [COMPOSABLE] useProducts called')
  
  // useFetch automatically handles SSR and caching
  const { data, pending, error, refresh } = useFetch('/api/products', {
    // This key is used for caching and deduplication
    key: 'products-list',
    
    // Transform the response to make it easier to work with
    transform: (response: any) => {
      console.log('🔄 [COMPOSABLE] Transforming response:', response)
      console.log('🔄 [COMPOSABLE] Products count:', response.products?.length || 0)
      return {
        products: response.products || [],
        count: response.count || 0
      }
    },
    
    // Cache for 5 minutes to reduce backend calls
    getCachedData(key) {
      const data = useNuxtData(key)
      if (!data.data.value) {
        return
      }
      
      // Return cached data if it's less than 5 minutes old
      const expirationDate = new Date(data._fetchedAt || 0)
      expirationDate.setTime(expirationDate.getTime() + 5 * 60 * 1000) // 5 minutes
      
      const isExpired = expirationDate.getTime() < Date.now()
      if (isExpired) {
        return
      }
      
      return data.data.value
    }
  })

  // Watch for data changes
  watch(data, (newData) => {
    console.log('👀 [COMPOSABLE] Data changed:', newData)
    console.log('👀 [COMPOSABLE] Products in data:', newData?.products?.length || 0)
  })

  watch(error, (newError) => {
    if (newError) {
      console.error('❌ [COMPOSABLE] Error detected:', newError)
    }
  })

  watch(pending, (isPending) => {
    console.log('⏳ [COMPOSABLE] Pending status:', isPending)
  })

  return {
    products: computed(() => {
      const prods = data.value?.products || []
      console.log('📊 [COMPOSABLE] Returning products:', prods.length)
      return prods
    }),
    count: computed(() => data.value?.count || 0),
    pending,
    error,
    refresh
  }
}

