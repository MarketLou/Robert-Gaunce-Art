/**
 * Composable for fetching a single product/artwork by ID
 * This will fetch data on the server (SSR) for SEO benefits
 * Useful for individual product detail pages
 */

export const useProduct = (productId: string | Ref<string>) => {
  // Convert to ref if it's not already
  const id = isRef(productId) ? productId : ref(productId)
  
  // useFetch automatically handles SSR and caching
  const { data, pending, error, refresh } = useFetch(`/api/products/${id.value}`, {
    // Dynamic key based on product ID
    key: `product-${id.value}`,
    
    // Transform the response to make it easier to work with
    transform: (response: any) => {
      return response.product || null
    },
    
    // Watch the ID and refetch when it changes
    watch: [id],
    
    // Cache for 10 minutes to reduce backend calls
    getCachedData(key) {
      const data = useNuxtData(key)
      if (!data.data.value) {
        return
      }
      
      // Return cached data if it's less than 10 minutes old
      const expirationDate = new Date(data._fetchedAt || 0)
      expirationDate.setTime(expirationDate.getTime() + 10 * 60 * 1000) // 10 minutes
      
      const isExpired = expirationDate.getTime() < Date.now()
      if (isExpired) {
        return
      }
      
      return data.data.value
    }
  })

  return {
    product: computed(() => data.value),
    pending,
    error,
    refresh
  }
}

