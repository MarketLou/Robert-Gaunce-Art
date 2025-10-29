<template>
  <footer class="border-t bg-muted/40">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- About Section -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Robert Gaunce Art</h3>
          <p class="text-sm text-muted-foreground">
            Watercolor artist specializing in nature, wildlife, and portrait commissions.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <nav class="space-y-2 text-sm">
            <NuxtLink to="/portfolio" class="block text-muted-foreground hover:text-foreground transition-colors">
              Portfolio
            </NuxtLink>
            <NuxtLink to="/commissions" class="block text-muted-foreground hover:text-foreground transition-colors">
              Commissions
            </NuxtLink>
            <NuxtLink to="/shop" class="block text-muted-foreground hover:text-foreground transition-colors">
              Shop
            </NuxtLink>
            <NuxtLink to="/about" class="block text-muted-foreground hover:text-foreground transition-colors">
              About
            </NuxtLink>
            <NuxtLink to="/contact" class="block text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </NuxtLink>
          </nav>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Contact</h3>
          <p class="text-sm text-muted-foreground">
            Serving Paris and Lexington, Kentucky
          </p>
          <p class="text-sm text-muted-foreground mt-2">
            Email: <a href="mailto:info@robertgaunceart.com" class="hover:text-foreground transition-colors">
              info@robertgaunceart.com
            </a>
          </p>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
        <p>&copy; {{ new Date().getFullYear() }} Robert Gaunce. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

