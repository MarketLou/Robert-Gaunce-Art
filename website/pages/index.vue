<template>
  <div class="-mt-16">
    <!-- Hero Section -->
    <section class="relative h-[calc(100vh+15rem)] flex items-center justify-center overflow-hidden pt-16 pb-36">
      <div class="absolute inset-0">
        <img src="/pond_watercolor.png" alt="Robert Gaunce Artwork" class="w-full h-full object-cover scale-95" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent"></div>
      <div class="container relative z-10 text-center px-4 mx-auto">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 text-white">
          Robert Gaunce Art
        </h1>
        <p class="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
          Watercolor artist specializing in nature, wildlife, and portrait commissions
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/portfolio" 
            class="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            View Portfolio
          </NuxtLink>
          <NuxtLink 
            to="/commissions" 
            class="inline-flex items-center justify-center rounded-md border border-white/80 bg-white/10 backdrop-blur-sm px-8 py-3 text-sm font-medium text-white hover:bg-white/20 transition-colors"
          >
            Request Commission
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Work Section -->
    <section class="py-20 bg-muted/30">
      <div class="container px-4 mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12">Featured Artwork</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Artwork cards -->
          <div class="bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-shadow">
            <div class="aspect-square bg-muted flex items-center justify-center">
              <img src="/wedding_commission.jpg" alt="Wedding Commission" class="w-full h-full object-cover" />
            </div>
            <div class="p-4">
              <h3 class="font-semibold mb-2">Wedding Commission</h3>
              <p class="text-sm text-muted-foreground">Commissioned work</p>
            </div>
          </div>
          <div class="bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-shadow">
            <div class="aspect-square bg-muted flex items-center justify-center">
              <img src="/Orchids_Watercolor.jpg" alt="Orchids Watercolor" class="w-full h-full object-cover" />
            </div>
            <div class="p-4">
              <h3 class="font-semibold mb-2">Water Color Orchids</h3>
              <p class="text-sm text-muted-foreground">Original artwork</p>
            </div>
          </div>
          <div class="bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-shadow">
            <div class="aspect-square bg-muted flex items-center justify-center">
              <img src="/wolverine_watercolor.jpg" alt="Sketch Wolverine" class="w-full h-full object-cover" />
            </div>
            <div class="p-4">
              <h3 class="font-semibold mb-2">Sketch Wolverine</h3>
              <p class="text-sm text-muted-foreground">Original artwork</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Teaser Section -->
    <section class="py-20 bg-muted/30">
      <div class="container px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-6">About the Artist</h2>
            <p class="text-muted-foreground mb-4">
              Robert Gaunce is a watercolor artist based in Paris, Kentucky, specializing in nature, 
              wildlife, and portrait commissions. With over 60 commissioned artworks and 100+ prints sold, 
              Robert's work blends traditional techniques with contemporary approaches.
            </p>
            <p class="text-muted-foreground mb-6">
              His signature "line and wash" technique combines controlled ink drawing with the chaotic, 
              fluid nature of watercolors, creating pieces that are both realistic and expressive.
            </p>
            <NuxtLink 
              to="/about" 
              class="inline-flex items-center text-primary hover:underline"
            >
              Learn more about Robert →
            </NuxtLink>
          </div>
          <div class="aspect-square bg-muted rounded-lg overflow-hidden">
            <img src="/Robert_Gaunce_Bio_Pic.jpg" alt="Robert Gaunce" class="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-primary/10">
      <div class="container px-4 mx-auto text-center">
        <h2 class="text-3xl font-bold mb-6">Interested in a Commission?</h2>
        <p class="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Robert accepts commissions for portraits, nature scenes, wildlife, and watercolor cartoon illustrations. 
          Based in Paris, Kentucky, serving Lexington and surrounding areas.
        </p>
        <NuxtLink 
          to="/commissions" 
          class="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Get Started
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Robert Gaunce Art - Watercolor Artist',
  description: 'Original watercolor artwork and commissions by Robert Gaunce. Specializing in nature, wildlife, and portraits. Based in Paris, Kentucky.',
  ogTitle: 'Robert Gaunce Art - Watercolor Artist',
  ogDescription: 'Original watercolor artwork and commissions by Robert Gaunce. Specializing in nature, wildlife, and portraits.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
})
</script>

