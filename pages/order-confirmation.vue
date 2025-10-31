<template>
  <div class="order-confirmation-page">
    <div class="container mx-auto px-4 py-12 max-w-2xl">
      <!-- Success Icon -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h1 class="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p class="text-muted-foreground">Thank you for your purchase</p>
      </div>

      <!-- Order Summary -->
      <div class="bg-card rounded-lg border p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
        <p class="text-muted-foreground mb-4">
          Your order has been successfully processed. You will receive a confirmation email shortly.
        </p>
        
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-muted-foreground">Order Number</span>
            <span class="font-medium">{{ orderNumber || 'Processing...' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">Total</span>
            <span class="font-medium">{{ orderTotal || 'Calculating...' }}</span>
          </div>
        </div>
      </div>

      <!-- Next Steps -->
      <div class="bg-muted/30 rounded-lg p-6 mb-6">
        <h3 class="font-semibold mb-2">What's Next?</h3>
        <ul class="space-y-2 text-sm text-muted-foreground">
          <li>• You'll receive an email confirmation with order details</li>
          <li>• Your artwork will be prepared for shipment</li>
          <li>• We'll notify you when your order ships</li>
        </ul>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4">
        <NuxtLink
          to="/shop"
          class="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-center font-medium"
        >
          Continue Shopping
        </NuxtLink>
        <NuxtLink
          to="/"
          class="flex-1 px-6 py-3 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-center font-medium"
        >
          Back to Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Order Confirmation - Robert Gaunce Art',
  description: 'Your order has been confirmed.',
  robots: 'noindex, nofollow', // Don't index confirmation pages
})

// These would typically come from query params or be stored after payment
const orderNumber = ref<string | null>(null)
const orderTotal = ref<string | null>(null)

// Try to get order info from URL params
const route = useRoute()
if (route.query.order_id) {
  orderNumber.value = route.query.order_id as string
}

// Format total if available
if (route.query.total) {
  const total = parseFloat(route.query.total as string)
  if (!isNaN(total)) {
    orderTotal.value = `$${(total / 100).toFixed(2)}`
  }
}
</script>

<style scoped>
.order-confirmation-page {
  min-height: 100vh;
  background: #f9fafb;
}
</style>

