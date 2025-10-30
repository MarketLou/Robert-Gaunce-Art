/**
 * Server API Route: Get all products from Medusa
 * This runs on the Nuxt server, not in the browser
 * Good for SEO and keeps API calls secure
 */

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  let backendUrl = config.public.medusaBackendUrl
  const apiKey = config.public.medusaPublishableKey

  console.log('🔷 [SERVER API] /api/products called')
  console.log('📍 Backend URL:', backendUrl || '(EMPTY)')
  console.log('🔑 API Key present:', apiKey ? 'YES' : 'NO')

  if (!backendUrl) {
    console.error('❌ [SERVER API] Backend URL is not configured!')
    throw createError({
      statusCode: 500,
      message: 'Medusa backend URL is not configured'
    })
  }

  if (!apiKey) {
    console.error('❌ [SERVER API] API Key is not configured!')
    throw createError({
      statusCode: 500,
      message: 'Medusa publishable API key is not configured'
    })
  }

  // Remove trailing slash from backend URL if present
  backendUrl = backendUrl.replace(/\/$/, '')

  try {
    console.log('📡 [SERVER API] Fetching from:', `${backendUrl}/store/products`)
    
    // Fetch products from Medusa Store API
    // Medusa v2 requires a publishable API key for authentication
    const response = await fetch(`${backendUrl}/store/products`, {
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': apiKey,
      }
    })

    console.log('📥 [SERVER API] Response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ [SERVER API] Bad response:', errorText)
      throw new Error(`Medusa API returned ${response.status}`)
    }

    const data = await response.json()
    
    console.log('✅ [SERVER API] Products received:', data.products?.length || 0)
    console.log('📦 [SERVER API] Product data:', JSON.stringify(data.products, null, 2))
    
    // Check image URLs specifically
    if (data.products?.length > 0) {
      data.products.forEach((product: any, index: number) => {
        console.log(`🖼️ [SERVER API] Product ${index + 1} thumbnail:`, product.thumbnail)
        console.log(`🖼️ [SERVER API] Product ${index + 1} images:`, product.images)
      })
    }
    
    return {
      products: data.products || [],
      count: data.count || 0
    }
  } catch (error: any) {
    console.error('❌ [SERVER API] Error fetching products:', error.message)
    console.error('❌ [SERVER API] Full error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch products from backend'
    })
  }
})

