/**
 * Server API Route: Get a single product by ID from Medusa
 * This runs on the Nuxt server, not in the browser
 * Good for SEO on individual product pages
 */

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  let backendUrl = config.public.medusaBackendUrl
  const apiKey = config.public.medusaPublishableKey

  // Get the product ID from the URL parameter
  const productId = getRouterParam(event, 'id')

  if (!productId) {
    throw createError({
      statusCode: 400,
      message: 'Product ID is required'
    })
  }

  if (!backendUrl) {
    throw createError({
      statusCode: 500,
      message: 'Medusa backend URL is not configured'
    })
  }

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      message: 'Medusa publishable API key is not configured'
    })
  }

  // Remove trailing slash from backend URL if present
  backendUrl = backendUrl.replace(/\/$/, '')

  try {
    // Fetch single product from Medusa Store API
    // Medusa v2 requires a publishable API key for authentication
    const response = await fetch(`${backendUrl}/store/products/${productId}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': apiKey,
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw createError({
          statusCode: 404,
          message: 'Product not found'
        })
      }
      throw new Error(`Medusa API returned ${response.status}`)
    }

    const data = await response.json()
    
    return {
      product: data.product || null
    }
  } catch (error: any) {
    console.error('Error fetching product from Medusa:', error)
    
    // Pass through 404 errors
    if (error.statusCode === 404) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch product from backend'
    })
  }
})

