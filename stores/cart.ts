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
      this.isOpen = !this.isOpen
    },

    async initializeCart() {
      // Check localStorage for existing cart
      const savedCartId = localStorage.getItem('cart_id')
      
      if (savedCartId) {
        try {
          // Retrieve existing cart from Medusa
          const { $medusa } = useNuxtApp()
          const response = await $medusa.store.cart.retrieve(savedCartId)
          
          if (response.cart) {
            this.cartId = savedCartId
            this.cart = response.cart
          } else {
            // Cart not found, create new one
            localStorage.removeItem('cart_id')
            await this.createCart()
          }
        } catch (error) {
          console.error('Invalid cart, creating new one', error)
          localStorage.removeItem('cart_id')
          await this.createCart()
        }
      } else {
        await this.createCart()
      }
    },

    async createCart() {
      this.isLoading = true
      try {
        const { $medusa } = useNuxtApp()
        const response = await $medusa.store.cart.create({
          region_id: undefined, // Will use default region
        })
        
        if (response.cart) {
          this.cartId = response.cart.id
          this.cart = response.cart
          localStorage.setItem('cart_id', this.cartId)
        }
      } catch (error) {
        console.error('Failed to create cart', error)
      } finally {
        this.isLoading = false
      }
    },

    async addItem({ variantId, quantity }: { variantId: string, quantity: number }) {
      if (!this.cartId) {
        await this.createCart()
      }

      this.isLoading = true
      try {
        const { $medusa } = useNuxtApp()
        const response = await $medusa.store.cart.lineItems.create(this.cartId, {
          variant_id: variantId,
          quantity
        })
        
        if (response.cart) {
          this.cart = response.cart
        }
      } catch (error) {
        console.error('Failed to add item to cart', error)
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
        const response = await $medusa.store.cart.lineItems.delete(this.cartId, itemId)
        
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
        const response = await $medusa.store.cart.lineItems.update(this.cartId, itemId, {
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

    clearCart() {
      this.cartId = null
      this.cart = null
      localStorage.removeItem('cart_id')
    }
  }
})

