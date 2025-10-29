import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartId: null as string | null,
    cart: null as any,
    isLoading: false
  }),

  getters: {
    itemCount: (state) => {
      return state.cart?.items?.length || 0
    },
    total: (state) => {
      return state.cart?.total || 0
    }
  },

  actions: {
    async initializeCart() {
      // Check localStorage for existing cart
      const savedCartId = localStorage.getItem('cart_id')
      
      if (savedCartId) {
        try {
          // Validate cart with backend
          // TODO: Connect to Medusa backend
          this.cartId = savedCartId
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
        // TODO: Connect to Medusa backend to create cart
        // const { $medusa } = useNuxtApp()
        // const result = await $medusa.store.cart.create({...})
        // this.cartId = result.cart.id
        // localStorage.setItem('cart_id', this.cartId)
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
        // TODO: Connect to Medusa backend
        // const { $medusa } = useNuxtApp()
        // const result = await $medusa.store.cart.lineItems.create(this.cartId, {
        //   variant_id: variantId,
        //   quantity
        // })
        // this.cart = result.cart
      } catch (error) {
        console.error('Failed to add item to cart', error)
      } finally {
        this.isLoading = false
      }
    },

    async removeItem(itemId: string) {
      if (!this.cartId) return

      this.isLoading = true
      try {
        // TODO: Connect to Medusa backend
        // const { $medusa } = useNuxtApp()
        // const result = await $medusa.store.cart.lineItems.delete(this.cartId, itemId)
        // this.cart = result.cart
      } catch (error) {
        console.error('Failed to remove item from cart', error)
      } finally {
        this.isLoading = false
      }
    },

    async updateQuantity({ itemId, quantity }: { itemId: string, quantity: number }) {
      if (!this.cartId) return

      this.isLoading = true
      try {
        // TODO: Connect to Medusa backend
        // const { $medusa } = useNuxtApp()
        // const result = await $medusa.store.cart.lineItems.update(this.cartId, itemId, {
        //   quantity
        // })
        // this.cart = result.cart
      } catch (error) {
        console.error('Failed to update quantity', error)
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

