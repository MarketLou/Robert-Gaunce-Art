<template>
  <header 
    :class="[
      'top-0 z-50 w-full transition-all duration-300',
      isHomePage 
        ? 'absolute bg-transparent text-white' 
        : 'sticky border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
    ]"
  >
    <div class="container flex h-16 items-center justify-between px-4">
      <NuxtLink 
        to="/" 
        :class="[
          'flex items-center space-x-2 text-xl font-bold',
          isHomePage ? 'text-white' : ''
        ]"
      >
        Robert Gaunce Art
      </NuxtLink>
      
      <nav class="hidden md:flex items-center space-x-6">
        <NuxtLink 
          to="/" 
          :class="[
            'text-sm font-medium hover:text-primary transition-colors',
            isHomePage ? 'text-white hover:text-white/80' : ''
          ]"
        >
          Home
        </NuxtLink>
        <NuxtLink 
          to="/portfolio" 
          :class="[
            'text-sm font-medium hover:text-primary transition-colors',
            isHomePage ? 'text-white hover:text-white/80' : ''
          ]"
        >
          Portfolio
        </NuxtLink>
        <NuxtLink 
          to="/commissions" 
          :class="[
            'text-sm font-medium hover:text-primary transition-colors',
            isHomePage ? 'text-white hover:text-white/80' : ''
          ]"
        >
          Commissions
        </NuxtLink>
        <NuxtLink 
          to="/shop" 
          :class="[
            'text-sm font-medium hover:text-primary transition-colors',
            isHomePage ? 'text-white hover:text-white/80' : ''
          ]"
        >
          Shop
        </NuxtLink>
        <NuxtLink 
          to="/about" 
          :class="[
            'text-sm font-medium hover:text-primary transition-colors',
            isHomePage ? 'text-white hover:text-white/80' : ''
          ]"
        >
          About
        </NuxtLink>
        <NuxtLink 
          to="/contact" 
          :class="[
            'text-sm font-medium hover:text-primary transition-colors',
            isHomePage ? 'text-white hover:text-white/80' : ''
          ]"
        >
          Contact
        </NuxtLink>
      </nav>

      <!-- Mobile menu button -->
      <button 
        @click="mobileMenuOpen = !mobileMenuOpen" 
        :class="[
          'md:hidden',
          isHomePage ? 'text-white' : ''
        ]"
        aria-label="Toggle menu"
      >
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <nav 
      v-if="mobileMenuOpen" 
      :class="[
        'md:hidden border-t',
        isHomePage ? 'bg-black/90 text-white' : 'bg-background'
      ]"
    >
      <div class="container px-4 py-4 space-y-2">
        <NuxtLink 
          to="/" 
          :class="[
            'block py-2 transition-colors',
            isHomePage ? 'text-white hover:text-white/80' : 'hover:text-primary'
          ]"
        >Home</NuxtLink>
        <NuxtLink 
          to="/portfolio" 
          :class="[
            'block py-2 transition-colors',
            isHomePage ? 'text-white hover:text-white/80' : 'hover:text-primary'
          ]"
        >Portfolio</NuxtLink>
        <NuxtLink 
          to="/commissions" 
          :class="[
            'block py-2 transition-colors',
            isHomePage ? 'text-white hover:text-white/80' : 'hover:text-primary'
          ]"
        >Commissions</NuxtLink>
        <NuxtLink 
          to="/shop" 
          :class="[
            'block py-2 transition-colors',
            isHomePage ? 'text-white hover:text-white/80' : 'hover:text-primary'
          ]"
        >Shop</NuxtLink>
        <NuxtLink 
          to="/about" 
          :class="[
            'block py-2 transition-colors',
            isHomePage ? 'text-white hover:text-white/80' : 'hover:text-primary'
          ]"
        >About</NuxtLink>
        <NuxtLink 
          to="/contact" 
          :class="[
            'block py-2 transition-colors',
            isHomePage ? 'text-white hover:text-white/80' : 'hover:text-primary'
          ]"
        >Contact</NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false)
const route = useRoute()

// Check if we're on the home page
const isHomePage = computed(() => route.path === '/')
</script>

