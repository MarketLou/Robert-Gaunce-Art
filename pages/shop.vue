<template>
  <div class="shop-page">
    <!-- Floating Cart Button -->
    <button 
      class="cart-icon-btn" 
      @click="cartStore.toggleCart()"
      :class="{ 'has-items': cartStore.itemCount > 0 }"
      aria-label="Shopping cart"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      <span v-if="cartStore.itemCount > 0" class="cart-badge">{{ cartStore.itemCount }}</span>
    </button>

    <div class="container mx-auto px-4 py-12">
      <header class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Shop</h1>
        <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
          Previous works available for purchase
        </p>
      </header>

      <!-- Loading State -->
      <div v-if="pending" class="text-center py-12">
        <p class="text-muted-foreground">Loading artwork...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-500 mb-4">Unable to load products at this time.</p>
        <button 
          @click="refresh()"
          class="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>

      <!-- Product Grid -->
      <div v-else-if="products.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="product in products" 
          :key="product.id"
          class="bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-shadow"
        >
          <!-- Product Image -->
          <div class="aspect-square bg-muted overflow-hidden">
            <img 
              v-if="product.thumbnail"
              :src="product.thumbnail" 
              :alt="product.title"
              class="w-full h-full object-cover"
            />
          </div>
          
          <!-- Product Info -->
          <div class="p-4">
            <h3 class="font-semibold mb-1">{{ product.title }}</h3>
            <p class="text-sm text-muted-foreground mb-2 line-clamp-2">
              {{ product.description || 'Watercolor artwork' }}
            </p>
            
            <!-- Price -->
            <p v-if="product.variants && product.variants.length > 0" class="text-2xl font-bold mb-4">
              {{ formatPrice(product.variants[0]) }}
            </p>
            <p v-else class="text-2xl font-bold mb-4">Contact for Price</p>
            
            <!-- Add to Cart Button -->
            <button 
              @click="addToCart(product)"
              :disabled="cartStore.isLoading"
              class="w-full rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ cartStore.isLoading ? 'Adding...' : 'Add to Cart' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <p class="text-muted-foreground mb-4">No products available yet.</p>
        <p class="text-sm text-muted-foreground">Check back soon or request a custom commission!</p>
      </div>

      <!-- Info Section -->
      <div class="mt-16 bg-muted/30 p-8 rounded-lg text-center max-w-3xl mx-auto">
        <h2 class="text-2xl font-bold mb-4">About These Works</h2>
        <p class="text-muted-foreground mb-6">
          These are previous works by Robert Gaunce that are available for immediate purchase. 
          Each piece is a unique watercolor original, signed by the artist.
        </p>
        <p class="text-sm text-muted-foreground mb-6">
          Looking for something custom? Check out the commission page to request a personalized piece.
        </p>
        <NuxtLink 
          to="/commissions" 
          class="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Request a Commission
        </NuxtLink>
      </div>
    </div>

    <!-- Cart Sidebar -->
    <CartSidebar />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

useSeoMeta({
  title: 'Shop - Robert Gaunce Art',
  description: 'Browse and purchase original watercolor artwork and prints by Robert Gaunce. Previous works available for immediate purchase.',
  ogTitle: 'Shop - Robert Gaunce Art',
  ogDescription: 'Browse original watercolor artwork and prints available for purchase.',
})

// Initialize cart store
const cartStore = useCartStore()

// Fetch products from Medusa backend
const { products, pending, error, refresh } = useProducts()

// Format price helper
const formatPrice = (variant: any) => {
  if (!variant || !variant.prices || variant.prices.length === 0) {
    return 'Contact for Price'
  }
  
  const price = variant.prices[0]
  const amount = price.amount / 100 // Convert from cents to dollars
  
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

// Add to cart function - now connected to Medusa
const addToCart = async (product: any) => {
  if (!product.variants || product.variants.length === 0) {
    alert('This product has no variants available')
    return
  }

  try {
    const variantId = product.variants[0].id
    await cartStore.addItem({
      variantId,
      quantity: 1
    })
    
    // Open cart sidebar to show the added item
    cartStore.isOpen = true
  } catch (error) {
    console.error('Error adding to cart:', error)
    alert('Failed to add item to cart. Please try again.')
  }
}

// Initialize cart on page load
onMounted(async () => {
  await cartStore.initializeCart()
})
</script>

<style scoped>
.shop-page {
  position: relative;
  min-height: 100vh;
}

/* Floating Cart Button */
.cart-icon-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background: #161D2D;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 998;
}

.cart-icon-btn:hover {
  background: #2a3441;
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
}

.cart-icon-btn.has-items {
  background: #004dff;
}

.cart-icon-btn.has-items:hover {
  background: #0040d9;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #dc3545;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  border: 2px solid white;
}

/* Responsive */
@media (max-width: 768px) {
  .cart-icon-btn {
    width: 50px;
    height: 50px;
    top: 15px;
    right: 15px;
  }

  .cart-badge {
    width: 20px;
    height: 20px;
    font-size: 0.7rem;
  }
}
</style>

