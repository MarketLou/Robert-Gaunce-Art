import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartId: null as string | null,
    cart: null as any,
    isLoading: false,
    isOpen: false
  }),

  getters: {
    itemCount: (state) => {
      return state.cart?.items?.length || 0
    },
    total: (state) => {
      return state.cart?.total || 0
    },
    items: (state) => {
      return state.cart?.items || []
    },
    hasItems: (state) => {
      return (state.cart?.items?.length || 0) > 0
    },
    formattedTotal: (state) => {
      const total = state.cart?.total || 0
      const currencyCode = state.cart?.region?.currency_code?.toUpperCase() || 'USD'
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode
      }).format(total / 100)
    }
  },

  actions: {
    toggleCart() {
      console.log('🛒 [CART STORE] Toggle cart:', !this.isOpen)
      this.isOpen = !this.isOpen
    },

    async initializeCart() {
      console.log('🛒 [CART STORE] Initializing cart...')
      // Check localStorage for existing cart
      const savedCartId = localStorage.getItem('cart_id')
      
      if (savedCartId) {
        console.log('🛒 [CART STORE] Found saved cart ID:', savedCartId)
        try {
          // Retrieve existing cart from Medusa
          const { $medusa } = useNuxtApp()
          console.log('🛒 [CART STORE] Retrieving existing cart...')
          // Retrieve cart without fields parameter (causes 500 error)
          const response = await $medusa.store.cart.retrieve(savedCartId)
          
          console.log('🛒 [CART STORE] Cart retrieved response:', response)
          console.log('🛒 [CART STORE] Cart region in response:', response.cart?.region)
          console.log('🛒 [CART STORE] Cart region_id:', response.cart?.region_id)
          
          if (response.cart) {
            console.log('✅ [CART STORE] Cart retrieved successfully')
            this.cartId = savedCartId
            this.cart = response.cart
            
            // If region is not in response, fetch it separately using region_id
            if (!response.cart.region && response.cart.region_id) {
              console.log('⚠️ [CART STORE] Region not in response, fetching separately...')
              try {
                const regionResponse = await $medusa.store.region.retrieve(response.cart.region_id)
                if (regionResponse.region) {
                  this.cart.region = regionResponse.region
                  console.log('✅ [CART STORE] Region fetched separately:', this.cart.region)
                  console.log('✅ [CART STORE] Region countries:', this.cart.region.countries)
                  console.log('✅ [CART STORE] Region country codes:', this.cart.region.countries?.map((c: any) => `${c.iso_2} - ${c.display_name}`))
                }
              } catch (regionError: any) {
                console.warn('⚠️ [CART STORE] Could not fetch region separately:', regionError.message)
              }
            }
          } else {
            console.log('⚠️ [CART STORE] Cart not found, creating new one')
            // Cart not found, create new one
            localStorage.removeItem('cart_id')
            await this.createCart()
          }
        } catch (error) {
          console.error('❌ [CART STORE] Invalid cart, creating new one:', error)
          localStorage.removeItem('cart_id')
          await this.createCart()
        }
      } else {
        console.log('🛒 [CART STORE] No saved cart, creating new one')
        await this.createCart()
      }
    },

    async createCart() {
      console.log('🛒 [CART STORE] Creating new cart...')
      this.isLoading = true
      try {
        const { $medusa } = useNuxtApp()
        console.log('🛒 [CART STORE] Calling Medusa store.cart.create()')
        const response = await $medusa.store.cart.create({
          region_id: undefined, // Will use default region
        })
        
        console.log('🛒 [CART STORE] Cart creation response:', response)
        
        if (response.cart) {
          console.log('✅ [CART STORE] Cart created successfully:', response.cart.id)
          this.cartId = response.cart.id
          this.cart = response.cart
          localStorage.setItem('cart_id', this.cartId)
        } else {
          console.error('❌ [CART STORE] No cart in response')
        }
      } catch (error) {
        console.error('❌ [CART STORE] Failed to create cart:', error)
      } finally {
        this.isLoading = false
      }
    },

    async addItem({ variantId, quantity }: { variantId: string, quantity: number }) {
      console.log('🛒 [CART STORE] Adding item to cart:', { variantId, quantity })
      
      if (!this.cartId) {
        console.log('🛒 [CART STORE] No cart ID, creating cart first')
        await this.createCart()
      }

      this.isLoading = true
      try {
        const { $medusa } = useNuxtApp()
        console.log('🛒 [CART STORE] Calling store.cart.createLineItem()', this.cartId)
        const response = await $medusa.store.cart.createLineItem(this.cartId, {
          variant_id: variantId,
          quantity
        })
        
        console.log('🛒 [CART STORE] Add item response:', response)
        
        if (response.cart) {
          console.log('✅ [CART STORE] Item added successfully')
          this.cart = response.cart
          console.log('🛒 [CART STORE] Cart now has', this.cart.items?.length || 0, 'items')
        }
      } catch (error) {
        console.error('❌ [CART STORE] Failed to add item:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async removeItem(itemId: string) {
      if (!this.cartId) return

      this.isLoading = true
      try {
        const { $medusa } = useNuxtApp()
        const response = await $medusa.store.cart.deleteLineItem(this.cartId, itemId)
        
        if (response.cart) {
          this.cart = response.cart
        }
      } catch (error) {
        console.error('Failed to remove item from cart', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async updateQuantity({ itemId, quantity }: { itemId: string, quantity: number }) {
      if (!this.cartId) return

      this.isLoading = true
      try {
        const { $medusa } = useNuxtApp()
        const response = await $medusa.store.cart.updateLineItem(this.cartId, itemId, {
          quantity
        })
        
        if (response.cart) {
          this.cart = response.cart
        }
      } catch (error) {
        console.error('Failed to update quantity', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async updateCart(updates: { shipping_address?: any, email?: string }) {
      if (!this.cartId) return

      this.isLoading = true
      try {
        const { $medusa } = useNuxtApp()
        
        // Debug: Log current cart region info
        console.log('🛒 [CART STORE] Updating cart:', this.cartId)
        console.log('🛒 [CART STORE] Current cart region:', this.cart?.region?.id, this.cart?.region?.name)
        console.log('🛒 [CART STORE] Current cart region countries:', this.cart?.region?.countries)
        console.log('🛒 [CART STORE] Update payload:', updates)
        
        // Debug: Check shipping address country code
        if (updates.shipping_address) {
          console.log('🛒 [CART STORE] Shipping address country_code:', updates.shipping_address.country_code)
          console.log('🛒 [CART STORE] Region countries codes:', this.cart?.region?.countries?.map((c: any) => c.iso_2))
        }
        
        const response = await $medusa.store.cart.update(this.cartId, updates)
        
        if (response.cart) {
          console.log('✅ [CART STORE] Cart updated successfully')
          console.log('✅ [CART STORE] Updated cart region:', response.cart.region?.id, response.cart.region?.name)
          this.cart = response.cart
        }
      } catch (error: any) {
        console.error('❌ [CART STORE] Failed to update cart:', error)
        console.error('❌ [CART STORE] Error message:', error.message)
        console.error('❌ [CART STORE] Error details:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    clearCart() {
      this.cartId = null
      this.cart = null
      localStorage.removeItem('cart_id')
    },

    async createPaymentSession(): Promise<string> {
      if (!this.cartId || !this.cart) {
        throw new Error('Cart ID and cart data are required')
      }

      console.log('💳 [CART STORE] Creating payment session for cart:', this.cartId)
      this.isLoading = true

      try {
        const { $medusa } = useNuxtApp()
        const config = useRuntimeConfig()
        const apiKey = config.public.medusaPublishableKey

        if (!apiKey) {
          throw new Error('Medusa publishable API key is not configured')
        }

        // Use Medusa SDK method (matches previous engineer's implementation)
        // This uses SDK's internal mechanism which handles CORS properly
        console.log('💳 [CART STORE] Using Medusa SDK initiatePaymentSession...')
        const { payment_collection } = await $medusa.store.payment.initiatePaymentSession(
          this.cart, 
          {
            provider_id: 'pp_stripe'  // Provider ID: 'stripe' in config becomes 'pp_stripe' in API
          },
          {}, // query parameters
          { "x-publishable-api-key": apiKey } // headers
        )

        // Find the Stripe payment session
        const stripeSession = payment_collection.payment_sessions?.find(
          (session: any) => session.provider_id === 'pp_stripe'
        )

        if (stripeSession) {
          console.log('✅ [CART STORE] Payment session created successfully')
          console.log('✅ [CART STORE] Client secret retrieved:', stripeSession.data.client_secret ? 'YES' : 'NO')
          return stripeSession.data.client_secret
        } else {
          console.error('❌ [CART STORE] No Stripe payment session found in payment collection')
          throw new Error('No Stripe payment session found')
        }

      } catch (error: any) {
        console.error('❌ [CART STORE] Error creating payment session:', error)
        console.error('❌ [CART STORE] Error details:', error.response?.data || error.message)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async completeCart() {
      if (!this.cartId) {
        throw new Error('Cart ID is required')
      }

      console.log('🛒 [CART STORE] Completing cart:', this.cartId)
      this.isLoading = true

      try {
        const { $medusa } = useNuxtApp()
        const config = useRuntimeConfig()
        const apiKey = config.public.medusaPublishableKey

        // Complete the cart (create order) - matches previous engineer's implementation
        const result = await $medusa.store.cart.complete(
          this.cartId,
          {}, // query parameters
          { "x-publishable-api-key": apiKey } // headers
        )

        // Check if completion was successful (matches old implementation)
        if (result.type === 'order') {
          // Order placed successfully
          const { order } = result
          
          // Clear the cart after successful completion
          this.clearCart()
          
          console.log('✅ [CART STORE] Order completed successfully:', order.id)
          return order
        } else {
          // Error occurred during completion
          console.error('❌ [CART STORE] Error completing cart:', result.error)
          throw new Error(result.error || 'Failed to complete cart')
        }
      } catch (error: any) {
        console.error('❌ [CART STORE] Error completing cart:', error.response?.data || error.message)
        throw error
      } finally {
        this.isLoading = false
      }
    }
  }
})

