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
          const response = await $medusa.store.cart.retrieve(savedCartId)
          
          if (response.cart) {
            console.log('✅ [CART STORE] Cart retrieved successfully')
            this.cartId = savedCartId
            this.cart = response.cart
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
        const response = await $medusa.store.cart.update(this.cartId, updates)
        
        if (response.cart) {
          this.cart = response.cart
        }
      } catch (error) {
        console.error('Failed to update cart', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    clearCart() {
      this.cartId = null
      this.cart = null
      localStorage.removeItem('cart_id')
    }
  }
})

