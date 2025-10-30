<template>
  <div>
    <!-- Backdrop -->
    <Transition name="fade">
      <div 
        v-if="cartStore.isOpen" 
        class="cart-backdrop"
        @click="cartStore.toggleCart()"
      ></div>
    </Transition>

    <!-- Sidebar -->
    <Transition name="slide">
      <div v-if="cartStore.isOpen" class="cart-sidebar">
        <!-- Header -->
        <div class="cart-header">
          <h2>Shopping Cart</h2>
          <button class="close-btn" @click="cartStore.toggleCart()" aria-label="Close cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Cart Content -->
        <div class="cart-content">
          <!-- Loading State -->
          <div v-if="cartStore.isLoading" class="cart-loading">
            <p>Loading...</p>
          </div>

          <!-- Empty Cart -->
          <div v-else-if="cartStore.items.length === 0" class="cart-empty">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <h3>Your cart is empty</h3>
            <p>Add some artwork to get started!</p>
            <button class="continue-shopping-btn" @click="cartStore.toggleCart()">
              Continue Shopping
            </button>
          </div>

          <!-- Cart Items -->
          <div v-else class="cart-items">
            <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
              <!-- Product Image -->
              <div class="item-image">
                <img 
                  :src="item.thumbnail || item.variant?.product?.thumbnail" 
                  :alt="item.title"
                  @error="(e) => e.target.src = '/placeholder-image.png'"
                />
              </div>

              <!-- Product Info -->
              <div class="item-info">
                <h3 class="item-title">{{ item.title }}</h3>
                <p class="item-variant" v-if="item.variant?.title && item.variant.title !== 'Default'">
                  {{ item.variant.title }}
                </p>
                <p class="item-price">{{ formatPrice(item.unit_price) }}</p>

                <!-- Quantity Controls -->
                <div class="quantity-controls">
                  <button 
                    class="qty-btn" 
                    @click="decrementQuantity(item)"
                    :disabled="item.quantity <= 1"
                  >
                    -
                  </button>
                  <span class="qty-display">{{ item.quantity }}</span>
                  <button 
                    class="qty-btn" 
                    @click="incrementQuantity(item)"
                  >
                    +
                  </button>
                </div>
              </div>

              <!-- Remove Button -->
              <button class="remove-btn" @click="removeFromCart(item.id)" aria-label="Remove item">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Cart Footer -->
        <div v-if="cartStore.items.length > 0" class="cart-footer">
          <div class="cart-total">
            <span class="total-label">Subtotal:</span>
            <span class="total-amount">{{ formatPrice(cartStore.total) }}</span>
          </div>
          <p class="shipping-note">Shipping and taxes calculated at checkout</p>
          <button class="checkout-btn" @click="handleCheckout">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

// Format price helper
const formatPrice = (amount: number) => {
  if (!amount && amount !== 0) return '$0.00'
  const dollars = amount / 100
  return `$${dollars.toFixed(2)}`
}

// Increment quantity
const incrementQuantity = async (item: any) => {
  try {
    await cartStore.updateQuantity({
      itemId: item.id,
      quantity: item.quantity + 1
    })
  } catch (error) {
    console.error('Error updating quantity:', error)
  }
}

// Decrement quantity
const decrementQuantity = async (item: any) => {
  if (item.quantity <= 1) return
  
  try {
    await cartStore.updateQuantity({
      itemId: item.id,
      quantity: item.quantity - 1
    })
  } catch (error) {
    console.error('Error updating quantity:', error)
  }
}

// Remove item from cart
const removeFromCart = async (itemId: string) => {
  try {
    await cartStore.removeItem(itemId)
  } catch (error) {
    console.error('Error removing item:', error)
  }
}

// Handle checkout (placeholder for Stripe integration)
const handleCheckout = () => {
  // TODO: Implement Stripe checkout in Step 5
  alert('Stripe checkout will be implemented in Step 5')
}
</script>

<style scoped>
/* Backdrop */
.cart-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* Sidebar */
.cart-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 450px;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

/* Header */
.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.cart-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #111827;
}

/* Content */
.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

/* Loading */
.cart-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #6b7280;
}

/* Empty State */
.cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1rem;
}

.cart-empty svg {
  color: #d1d5db;
  margin-bottom: 1.5rem;
}

.cart-empty h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #111827;
}

.cart-empty p {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.continue-shopping-btn {
  background: #161D2D;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.continue-shopping-btn:hover {
  background: #2a3441;
}

/* Cart Items */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  position: relative;
}

.item-image {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 0.375rem;
  overflow: hidden;
  background: #e5e7eb;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.item-title {
  font-size: 0.9375rem;
  font-weight: 600;
  margin: 0;
  color: #111827;
  line-height: 1.3;
}

.item-variant {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.item-price {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #161D2D;
  margin: 0.25rem 0;
}

/* Quantity Controls */
.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.qty-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.qty-btn:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.qty-display {
  font-size: 0.9375rem;
  font-weight: 500;
  min-width: 24px;
  text-align: center;
}

/* Remove Button */
.remove-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: #9ca3af;
  transition: color 0.2s;
}

.remove-btn:hover {
  color: #dc2626;
}

/* Footer */
.cart-footer {
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: white;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.total-label {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.total-amount {
  font-size: 1.5rem;
  font-weight: 700;
  color: #161D2D;
}

.shipping-note {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1rem 0;
}

.checkout-btn {
  width: 100%;
  background: #161D2D;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.checkout-btn:hover {
  background: #2a3441;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* Responsive */
@media (max-width: 480px) {
  .cart-sidebar {
    max-width: 100%;
  }

  .item-image {
    width: 70px;
    height: 70px;
  }

  .cart-header h2 {
    font-size: 1.25rem;
  }
}
</style>

