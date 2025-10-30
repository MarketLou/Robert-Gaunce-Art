/**
 * Server API Route: Get all products from Medusa
 * This runs on the Nuxt server, not in the browser
 * Good for SEO and keeps API calls secure
 */

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const backendUrl = config.public.medusaBackendUrl
  const apiKey = config.public.medusaPublishableKey

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

  try {
    // Fetch products from Medusa Store API
    // Medusa v2 requires a publishable API key for authentication
    const response = await fetch(`${backendUrl}/store/products`, {
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': apiKey,
      }
    })

    if (!response.ok) {
      throw new Error(`Medusa API returned ${response.status}`)
    }

    const data = await response.json()
    
    return {
      products: data.products || [],
      count: data.count || 0
    }
  } catch (error) {
    console.error('Error fetching products from Medusa:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch products from backend'
    })
  }
})

