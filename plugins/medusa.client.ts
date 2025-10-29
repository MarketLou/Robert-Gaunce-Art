import Medusa from '@medusajs/js-sdk'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  // Initialize Medusa SDK
  // Backend URL will be provided via environment variable
  const medusa = new Medusa({
    baseUrl: config.public.medusaBackendUrl || ''
  })

  return {
    provide: {
      medusa
    }
  }
})

