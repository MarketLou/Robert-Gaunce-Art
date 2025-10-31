<template>
  <div class="checkout-page">
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Checkout</h1>
        <p class="text-muted-foreground">Complete your order below</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoadingCart" class="text-center py-12">
        <p class="text-muted-foreground">Loading cart...</p>
      </div>

      <!-- Empty Cart Redirect -->
      <div v-else-if="!cartStore.cart || cartStore.items.length === 0" class="text-center py-12">
        <p class="text-lg mb-4">Your cart is empty</p>
        <NuxtLink to="/shop" class="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          Continue Shopping
        </NuxtLink>
      </div>

      <!-- Checkout Form -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Checkout Form (Left Column - 2/3 width) -->
        <div class="lg:col-span-2">
          <!-- Shipping Information -->
          <div class="bg-card rounded-lg border p-6 mb-6">
            <h2 class="text-xl font-semibold mb-4">Shipping Information</h2>
            
            <form @submit.prevent="handleShippingSubmit" class="space-y-4">
              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium mb-2">Email *</label>
                <input
                  id="email"
                  v-model="shippingForm.email"
                  type="email"
                  required
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>

              <!-- First Name -->
              <div>
                <label for="first_name" class="block text-sm font-medium mb-2">First Name *</label>
                <input
                  id="first_name"
                  v-model="shippingForm.first_name"
                  type="text"
                  required
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="John"
                />
              </div>

              <!-- Last Name -->
              <div>
                <label for="last_name" class="block text-sm font-medium mb-2">Last Name *</label>
                <input
                  id="last_name"
                  v-model="shippingForm.last_name"
                  type="text"
                  required
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Doe"
                />
              </div>

              <!-- Address -->
              <div>
                <label for="address_1" class="block text-sm font-medium mb-2">Address *</label>
                <input
                  id="address_1"
                  v-model="shippingForm.address_1"
                  type="text"
                  required
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="123 Main St"
                />
              </div>

              <!-- Address 2 (Optional) -->
              <div>
                <label for="address_2" class="block text-sm font-medium mb-2">Apartment, suite, etc. (Optional)</label>
                <input
                  id="address_2"
                  v-model="shippingForm.address_2"
                  type="text"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Apt 4B"
                />
              </div>

              <!-- City and State/Province -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="city" class="block text-sm font-medium mb-2">City *</label>
                  <input
                    id="city"
                    v-model="shippingForm.city"
                    type="text"
                    required
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label for="province" class="block text-sm font-medium mb-2">State/Province *</label>
                  <input
                    id="province"
                    v-model="shippingForm.province"
                    type="text"
                    required
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="NY"
                  />
                </div>
              </div>

              <!-- Postal Code and Country -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="postal_code" class="block text-sm font-medium mb-2">Postal Code *</label>
                  <input
                    id="postal_code"
                    v-model="shippingForm.postal_code"
                    type="text"
                    required
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="10001"
                  />
                </div>
                <div>
                  <label for="country_code" class="block text-sm font-medium mb-2">Country *</label>
                  <select
                    id="country_code"
                    v-model="shippingForm.country_code"
                    required
                    class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Country</option>
                    <option value="us">United States</option>
                    <option value="ca">Canada</option>
                    <option value="gb">United Kingdom</option>
                    <option value="au">Australia</option>
                  </select>
                </div>
              </div>

              <!-- Phone (Optional) -->
              <div>
                <label for="phone" class="block text-sm font-medium mb-2">Phone (Optional)</label>
                <input
                  id="phone"
                  v-model="shippingForm.phone"
                  type="tel"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <!-- Continue Button -->
              <div class="pt-4">
                <button
                  type="submit"
                  :disabled="isSubmitting || !isShippingFormValid"
                  class="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {{ isSubmitting ? 'Updating...' : 'Continue to Payment' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Payment Section (Will be shown after shipping is set) -->
          <div v-if="shippingComplete" class="bg-card rounded-lg border p-6">
            <h2 class="text-xl font-semibold mb-4">Payment</h2>
            <div id="payment-element">
              <!-- Stripe Payment Element will be mounted here -->
            </div>
            <button
              v-if="stripeLoaded && clientSecret"
              @click="handlePayment"
              :disabled="isProcessingPayment"
              class="mt-4 w-full px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {{ isProcessingPayment ? 'Processing...' : `Pay ${formatPrice(cartStore.total)}` }}
            </button>
          </div>
        </div>

        <!-- Order Summary (Right Column - 1/3 width) -->
        <div class="lg:col-span-1">
          <div class="bg-card rounded-lg border p-6 sticky top-4">
            <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
            
            <!-- Cart Items -->
            <div class="space-y-4 mb-6">
              <div v-for="item in cartStore.items" :key="item.id" class="flex gap-4">
                <div class="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                  <img
                    v-if="item.thumbnail || item.variant?.product?.thumbnail"
                    :src="item.thumbnail || item.variant?.product?.thumbnail"
                    :alt="item.title"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex-1">
                  <h3 class="font-medium text-sm">{{ item.title }}</h3>
                  <p v-if="item.variant?.title && item.variant.title !== 'Default'" class="text-xs text-muted-foreground">
                    {{ item.variant.title }}
                  </p>
                  <p class="text-sm mt-1">Quantity: {{ item.quantity }}</p>
                  <p class="text-sm font-semibold mt-1">{{ formatPrice(item.unit_price * item.quantity) }}</p>
                </div>
              </div>
            </div>

            <!-- Totals -->
            <div class="border-t pt-4 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Subtotal</span>
                <span>{{ formatPrice(cartStore.total) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Shipping</span>
                <span>Calculated at payment</span>
              </div>
              <div class="flex justify-between text-lg font-semibold pt-2 border-t">
                <span>Total</span>
                <span>{{ formatPrice(cartStore.total) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'
import { loadStripe, type Stripe, type StripeElements } from '@stripe/stripe-js'

useSeoMeta({
  title: 'Checkout - Robert Gaunce Art',
  description: 'Complete your order for original watercolor artwork.',
  robots: 'noindex, nofollow', // Don't index checkout pages
})

const cartStore = useCartStore()
const config = useRuntimeConfig()

// Shipping form state
const shippingForm = ref({
  email: '',
  first_name: '',
  last_name: '',
  address_1: '',
  address_2: '',
  city: '',
  province: '',
  postal_code: '',
  country_code: 'us', // Lowercase to match Medusa region format
  phone: ''
})

// UI state
const isLoadingCart = ref(true)
const isSubmitting = ref(false)
const shippingComplete = ref(false)
const isProcessingPayment = ref(false)

// Stripe state
const stripeLoaded = ref(false)
const stripe = ref<Stripe | null>(null)
const elements = ref<StripeElements | null>(null)
const clientSecret = ref<string | null>(null)

// Validation
const isShippingFormValid = computed(() => {
  return shippingForm.value.email &&
    shippingForm.value.first_name &&
    shippingForm.value.last_name &&
    shippingForm.value.address_1 &&
    shippingForm.value.city &&
    shippingForm.value.province &&
    shippingForm.value.postal_code &&
    shippingForm.value.country_code
})

// Format price helper
const formatPrice = (amount: number) => {
  if (!amount && amount !== 0) return '$0.00'
  const dollars = amount / 100
  return `$${dollars.toFixed(2)}`
}

// Load cart on mount
onMounted(async () => {
  try {
    if (!cartStore.cartId) {
      await cartStore.initializeCart()
    } else {
      await cartStore.initializeCart()
    }
    
    // Debug: Log cart region info after loading
    if (cartStore.cart) {
      console.log('📍 [CHECKOUT] Cart region ID:', cartStore.cart.region?.id)
      console.log('📍 [CHECKOUT] Cart region name:', cartStore.cart.region?.name)
      console.log('📍 [CHECKOUT] Cart region countries:', cartStore.cart.region?.countries)
      
      // Expand country codes to see actual values
      if (cartStore.cart.region?.countries) {
        const countryCodes = cartStore.cart.region.countries.map((c: any) => `${c.iso_2} - ${c.display_name}`)
        console.log('📍 [CHECKOUT] Cart region country codes:', countryCodes)
        console.log('📍 [CHECKOUT] Cart region country codes (expanded):', JSON.stringify(cartStore.cart.region.countries, null, 2))
        
        // Log first country details
        if (cartStore.cart.region.countries[0]) {
          console.log('📍 [CHECKOUT] First country in region:', cartStore.cart.region.countries[0])
          console.log('📍 [CHECKOUT] First country ISO code:', cartStore.cart.region.countries[0].iso_2)
        }
      }
      
      // Pre-fill country code from region if available
      if (cartStore.cart.region?.countries?.length > 0) {
        const defaultCountry = cartStore.cart.region.countries[0]
        if (defaultCountry?.iso_2 && !shippingForm.value.country_code) {
          shippingForm.value.country_code = defaultCountry.iso_2
          console.log('📍 [CHECKOUT] Pre-filled country code from region:', defaultCountry.iso_2)
        }
      }
    }
  } catch (error) {
    console.error('Error loading cart:', error)
  } finally {
    isLoadingCart.value = false
  }
})

// Handle shipping form submission
const handleShippingSubmit = async () => {
  if (!isShippingFormValid.value || !cartStore.cartId) return

  isSubmitting.value = true
  try {
    // Update cart with shipping address
    // IMPORTANT: Country code must be lowercase to match Medusa region
    await cartStore.updateCart({
      email: shippingForm.value.email,
      shipping_address: {
        first_name: shippingForm.value.first_name,
        last_name: shippingForm.value.last_name,
        address_1: shippingForm.value.address_1,
        address_2: shippingForm.value.address_2 || undefined,
        city: shippingForm.value.city,
        province: shippingForm.value.province,
        postal_code: shippingForm.value.postal_code,
        country_code: shippingForm.value.country_code.toLowerCase(), // Convert to lowercase
        phone: shippingForm.value.phone || undefined,
      }
    })

    shippingComplete.value = true

    // Create payment session and load Stripe
    await createPaymentSession()
  } catch (error) {
    console.error('Error updating shipping address:', error)
    alert('Failed to update shipping information. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

// Create payment session via cart store (matches previous engineer's implementation)
const createPaymentSession = async () => {
  try {
    console.log('🔵 [CHECKOUT] Creating payment session via cart store...')
    console.log('🔵 [CHECKOUT] Cart ID:', cartStore.cartId)
    
    // Use cart store method (bypasses server API route 404 issue)
    const clientSecretResult = await cartStore.createPaymentSession()
    
    console.log('🔵 [CHECKOUT] Payment session created, client secret received')

    if (clientSecretResult) {
      clientSecret.value = clientSecretResult
      await initializeStripe()
    } else {
      throw new Error('No client secret returned')
    }
  } catch (error) {
    console.error('Error creating payment session:', error)
    alert('Failed to initialize payment. Please try again.')
  }
}

// Initialize Stripe.js
const initializeStripe = async () => {
  const publishableKey = config.public.stripePublishableKey
  
  if (!publishableKey) {
    console.error('Stripe publishable key not configured')
    alert('Payment processing is not configured. Please contact support.')
    return
  }

  try {
    // Load Stripe
    const stripeInstance = await loadStripe(publishableKey)
    if (!stripeInstance) {
      throw new Error('Failed to load Stripe')
    }
    stripe.value = stripeInstance
    stripeLoaded.value = true

    // Initialize Elements
    const elementsInstance = stripeInstance.elements({
      clientSecret: clientSecret.value!,
      appearance: {
        theme: 'stripe',
      }
    })
    elements.value = elementsInstance

    // Mount Payment Element
    const paymentElement = elementsInstance.create('payment')
    await paymentElement.mount('#payment-element')

  } catch (error) {
    console.error('Error initializing Stripe:', error)
    alert('Failed to load payment form. Please refresh and try again.')
  }
}

// Handle payment submission
const handlePayment = async () => {
  if (!stripe.value || !elements.value || !clientSecret.value) return

  isProcessingPayment.value = true

  try {
    const { error } = await stripe.value.confirmPayment({
      elements: elements.value,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`
      },
      redirect: 'if_required'
    })

    if (error) {
      console.error('Payment error:', error)
      alert(error.message || 'Payment failed. Please try again.')
    } else {
      // Payment successful - complete cart (creates order) and redirect
      console.log('✅ [CHECKOUT] Payment confirmed, completing cart...')
      try {
        await cartStore.completeCart()
        console.log('✅ [CHECKOUT] Order created successfully')
        navigateTo('/order-confirmation')
      } catch (orderError) {
        console.error('❌ [CHECKOUT] Error completing cart:', orderError)
        // Still redirect even if order creation fails (payment was successful)
        navigateTo('/order-confirmation')
      }
    }
  } catch (error) {
    console.error('Payment error:', error)
    alert('An error occurred during payment. Please try again.')
  } finally {
    isProcessingPayment.value = false
  }
}
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  background: #f9fafb;
}
</style>

