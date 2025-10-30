import Medusa from '@medusajs/js-sdk'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  // Remove trailing slash from backend URL if present
  let backendUrl = config.public.medusaBackendUrl || ''
  backendUrl = backendUrl.replace(/\/$/, '')
  
  // Debug logging
  console.log('🔧 Medusa Plugin Initialized')
  console.log('📍 Backend URL:', backendUrl || '(EMPTY - CHECK YOUR .env FILE!)')
  console.log('🔑 Publishable Key:', config.public.medusaPublishableKey ? '✅ Set' : '❌ Missing')
  
  // Initialize Medusa SDK with publishable key
  const medusa = new Medusa({
    baseUrl: backendUrl,
    publishableKey: config.public.medusaPublishableKey || ''
  })

  // Debug: Log the SDK structure
  console.log('🔍 Medusa SDK object:', medusa)
  console.log('🔍 Available properties:', Object.keys(medusa))
  console.log('🔍 Has .store?', !!medusa.store)
  console.log('🔍 Has .carts?', !!medusa.carts)
  console.log('🔍 Has .cart?', !!medusa.cart)
  
  // Check nested properties
  if (medusa.store) {
    console.log('🔍 store properties:', Object.keys(medusa.store))
    console.log('🔍 Has store.cart?', !!medusa.store.cart)
    if (medusa.store.cart) {
      console.log('🔍 store.cart properties:', Object.keys(medusa.store.cart))
      console.log('🔍 Has store.cart.lineItems?', !!medusa.store.cart.lineItems)
      console.log('🔍 Full store.cart object:', medusa.store.cart)
    }
  }

  return {
    provide: {
      medusa
    }
  }
})

