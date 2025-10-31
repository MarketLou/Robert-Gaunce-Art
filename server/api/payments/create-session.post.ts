export default defineEventHandler(async (event) => {
  console.log('💳 [PAYMENT API] Creating payment session...')

  try {
    // Parse and validate request body
    const body = await readBody(event)
    const cartId = body?.cartId

    if (!cartId || typeof cartId !== 'string' || cartId.trim() === '') {
      throw createError({
        statusCode: 400,
        message: 'Cart ID is required'
      })
    }

    console.log('💳 [PAYMENT API] Cart ID:', cartId)

    const config = useRuntimeConfig()
    const backendUrl = config.public.medusaBackendUrl?.replace(/\/$/, '')
    const apiKey = config.public.medusaPublishableKey

    if (!backendUrl || !apiKey) {
      console.error('❌ [PAYMENT API] Missing backend URL or API key')
      throw createError({
        statusCode: 500,
        message: 'Payment configuration error'
      })
    }

    // Create payment session via Medusa API
    console.log('💳 [PAYMENT API] Calling Medusa payment session endpoint...')
    const sessionResponse = await fetch(`${backendUrl}/store/payment-sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': apiKey,
      },
      body: JSON.stringify({
        cart_id: cartId,
        provider_id: 'stripe'
      })
    })

    if (!sessionResponse.ok) {
      const errorText = await sessionResponse.text()
      console.error('❌ [PAYMENT API] Payment session creation failed:', sessionResponse.status, errorText)
      throw createError({
        statusCode: sessionResponse.status,
        message: 'Failed to create payment session'
      })
    }

    const sessionData = await sessionResponse.json()
    console.log('✅ [PAYMENT API] Payment session created:', sessionData.payment_session?.id)

    // Retrieve payment collection to get client secret
    const paymentCollectionId = sessionData.payment_session?.payment_collection_id
    if (!paymentCollectionId) {
      console.error('❌ [PAYMENT API] No payment collection ID in response')
      throw createError({
        statusCode: 500,
        message: 'Invalid payment session response'
      })
    }

    console.log('💳 [PAYMENT API] Retrieving payment collection:', paymentCollectionId)
    const collectionResponse = await fetch(`${backendUrl}/store/payment-collections/${paymentCollectionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': apiKey,
      }
    })

    if (!collectionResponse.ok) {
      const errorText = await collectionResponse.text()
      console.error('❌ [PAYMENT API] Payment collection retrieval failed:', collectionResponse.status, errorText)
      throw createError({
        statusCode: collectionResponse.status,
        message: 'Failed to retrieve payment collection'
      })
    }

    const collectionData = await collectionResponse.json()
    const clientSecret = collectionData.payment_collection?.data?.client_secret

    if (!clientSecret) {
      console.error('❌ [PAYMENT API] No client secret in payment collection')
      throw createError({
        statusCode: 500,
        message: 'Client secret not available'
      })
    }

    console.log('✅ [PAYMENT API] Client secret retrieved successfully')
    
    return {
      clientSecret,
      paymentSessionId: sessionData.payment_session?.id,
      paymentCollectionId
    }
  } catch (error: any) {
    console.error('❌ [PAYMENT API] Error:', error.message)
    
    // If it's already a createError, re-throw it
    if (error.statusCode) {
      throw error
    }

    // Otherwise, create a generic error
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to create payment session'
    })
  }
})

