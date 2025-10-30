import Medusa from '@medusajs/js-sdk'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  // Remove trailing slash from backend URL if present
  let backendUrl = config.public.medusaBackendUrl || ''
  backendUrl = backendUrl.replace(/\/$/, '')
  
  // Initialize Medusa SDK with publishable key
  const medusa = new Medusa({
    baseUrl: backendUrl,
    publishableKey: config.public.medusaPublishableKey || ''
  })

  return {
    provide: {
      medusa
    }
  }
})

