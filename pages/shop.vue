<template>
  <div class="container mx-auto px-4 py-12">
    <header class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Shop</h1>
      <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
        Previous works available for purchase
      </p>
    </header>

    <!-- Filter Tabs -->
    <div class="flex flex-wrap justify-center gap-2 mb-8">
      <button 
        @click="selectedType = 'original'"
        :class="selectedType === 'original' ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted'"
        class="px-6 py-2 rounded-md transition-colors"
      >
        Original Artwork
      </button>
      <button 
        @click="selectedType = 'print'"
        :class="selectedType === 'print' ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted'"
        class="px-6 py-2 rounded-md transition-colors"
      >
        Prints
      </button>
      <button 
        @click="selectedType = 'commission'"
        :class="selectedType === 'commission' ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted'"
        class="px-6 py-2 rounded-md transition-colors"
      >
        Commissions
      </button>
    </div>

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
    <div v-else-if="filteredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="product in filteredProducts" 
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
            class="w-full rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <p class="text-muted-foreground mb-4">No products available in this category yet.</p>
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
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Shop - Robert Gaunce Art',
  description: 'Browse and purchase original watercolor artwork and prints by Robert Gaunce. Previous works available for immediate purchase.',
  ogTitle: 'Shop - Robert Gaunce Art',
  ogDescription: 'Browse original watercolor artwork and prints available for purchase.',
})

// Fetch products from Medusa backend
const { products, pending, error, refresh } = useProducts()

// Filter state
const selectedType = ref('original')

// Filtered products based on selected type
// For now showing all products - can enhance filtering with collections/metadata later
const filteredProducts = computed(() => {
  if (selectedType.value === 'commission') {
    // Redirect to commissions page
    return []
  }
  
  // TODO: Filter by collection or product metadata when backend has categorized products
  // For now, show all products
  return products.value
})

// Format price helper
const formatPrice = (variant: any) => {
  if (!variant || !variant.prices || variant.prices.length === 0) {
    return 'Contact for Price'
  }
  
  const price = variant.prices[0]
  const amount = price.amount / 100 // Convert from cents to dollars
  const currency = price.currency_code?.toUpperCase() || 'USD'
  
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

// Add to cart function (placeholder for now - will wire up in Step 3)
const addToCart = (product: any) => {
  console.log('Add to cart:', product)
  // TODO: Implement cart functionality in Step 3
  alert(`"${product.title}" will be added to cart (cart functionality coming in Step 3)`)
}

// Redirect to commissions page when commission filter is selected
watch(selectedType, (newType) => {
  if (newType === 'commission') {
    navigateTo('/commissions')
  }
})
</script>

