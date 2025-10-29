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

    <!-- Product Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Placeholder product cards -->
      <div 
        v-for="i in 6" 
        :key="i"
        class="bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-shadow"
      >
        <div class="aspect-square bg-muted"></div>
        <div class="p-4">
          <h3 class="font-semibold mb-1">Original Artwork {{ i }}</h3>
          <p class="text-sm text-muted-foreground mb-2">Watercolor on paper</p>
          <p class="text-2xl font-bold mb-4">${{ (200 + i * 100).toLocaleString() }}</p>
          <button 
            class="w-full rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
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

const selectedType = ref('original')

// TODO: Integrate with Medusa backend to fetch products
// For now, showing placeholder products
</script>

