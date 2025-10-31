# Stripe Integration Setup

This document tracks the progress of Stripe payment integration with Medusa backend.

---

## 🎯 Overview

We're integrating Stripe as the payment provider for processing orders through Medusa. This integration will allow customers to:
- Complete checkout with credit/debit cards
- Process payments securely through Stripe
- Receive order confirmations

**Integration Flow:**
```
Cart → Checkout Page → Payment Session → Stripe → Order Confirmation
```

---

## 📋 Integration Checklist

### Backend Setup (Medusa on Railway)

- [x] **Step 1: Configure Stripe Payment Provider in Medusa** ✅ **COMPLETED**
  - [x] Install Stripe payment provider plugin (if not already installed)
  - [x] Add Stripe API keys to Medusa environment variables
  - [x] Configure Stripe payment provider in Medusa Admin
  - [x] Test payment provider connection
  
- [ ] **Step 2: Get Stripe API Keys**
  - [ ] Create Stripe account (or use existing)
  - [ ] Get Test API keys (for development)
  - [ ] Get Live API keys (for production)
  - [ ] Store keys securely in Medusa environment variables

- [ ] **Step 3: Configure Payment Provider Settings**
  - [ ] Set up payment methods (card payments)
  - [ ] Configure automatic capture vs manual capture
  - [ ] Set up webhooks (optional, for advanced features)

### Frontend Setup (Nuxt on Vercel)

- [x] **Step 2: Install Stripe.js and Add Environment Variables** ✅ **COMPLETED**
  - [x] Add `@stripe/stripe-js` package to frontend
  - [ ] Add Stripe publishable key to Vercel environment variables ⚠️ **ACTION NEEDED**
  - [x] Update `nuxt.config.ts` to expose publishable key

- [ ] **Step 3: Create Checkout Page**
  - [ ] Create `/pages/checkout.vue`
  - [ ] Add shipping address form (required by Medusa)
  - [ ] Update cart with shipping address before payment
  - [ ] Add loading states and error handling

- [ ] **Step 4: Implement Payment Session Creation**
  - [ ] Create server API route (`/server/api/payments/create-session.post.ts`)
  - [ ] Use Medusa SDK to create payment session
  - [ ] Retrieve client secret from payment collection
  - [ ] Return client secret to frontend

- [ ] **Step 5: Integrate Stripe Payment Processing**
  - [ ] Load Stripe.js dynamically on checkout page
  - [ ] Initialize Stripe client with publishable key
  - [ ] Use Stripe Elements or Payment Element for card input
  - [ ] Confirm payment with client secret from Medusa
  - [ ] Handle payment success/failure

- [ ] **Step 6: Handle Order Completion**
  - [ ] Complete cart in Medusa after successful payment
  - [ ] Clear cart from localStorage
  - [ ] Redirect to order confirmation page
  - [ ] Display order details and confirmation number

- [ ] **Step 7: Add Order Confirmation Page**
  - [ ] Create `/pages/order-confirmation.vue`
  - [ ] Display order details (items, totals, shipping)
  - [ ] Show order number
  - [ ] Add link back to shop

---

## 🚀 Step 1: Configure Stripe Payment Provider in Medusa (FIRST STEP)

**This is where we start!** This must be done on the backend (Medusa on Railway) before we can implement the frontend.

### What You Need to Do:

1. **Get Stripe API Keys** (if you don't have them yet):
   - Go to [Stripe Dashboard](https://dashboard.stripe.com/)
   - Navigate to **Developers → API Keys**
   - Copy your **Test Secret Key** (starts with `sk_test_...`)
   - Copy your **Test Publishable Key** (starts with `pk_test_...`)
   - Note: Use Test keys for now, switch to Live keys when ready for production

2. **Install Stripe Payment Provider in Medusa** (if not already installed):
   
   Check if Stripe is already installed in your Medusa backend. If you need to install it:
   
   ```bash
   # In your Medusa backend directory
   npm install @medusajs/payment-stripe
   ```
   
   **Note:** This should already be included in most Medusa installations, but verify first.

3. **Add Stripe Keys to Medusa Environment Variables** (on Railway):
   
   Go to your Railway Medusa project → **Variables** tab, and add:
   
   ```
   STRIPE_API_KEY=sk_test_your_test_secret_key_here
   ```
   
   **Important:** 
   - Use `STRIPE_API_KEY` (not `STRIPE_SECRET_KEY`)
   - Use your **Secret Key** (starts with `sk_test_` or `sk_live_`)
   - Do NOT commit this to Git (it's sensitive!)

4. **Configure Payment Provider in Medusa Admin**:
   
   - Log into your Medusa Admin dashboard
   - Navigate to **Settings → Payment Providers**
   - Find **Stripe** in the list
   - Click **Configure** or **Enable**
   - Enter your Stripe publishable key (starts with `pk_test_...`)
   - Save the configuration
   - Verify the provider shows as **Active** or **Enabled**

5. **Test the Connection**:
   - Try creating a test payment session (we'll implement this in frontend next)
   - Check Medusa logs for any Stripe-related errors

### Expected Outcome:

✅ Stripe payment provider shows as **Active/Enabled** in Medusa Admin  
✅ No errors when accessing payment providers in Medusa  
✅ Environment variable `STRIPE_API_KEY` is set on Railway  
✅ You have both Test API keys ready (secret and publishable)

---

## 📝 Notes

### Stripe API Keys:

**Test Keys (Development):**
- Secret Key: `sk_test_...` → Goes in Medusa `STRIPE_API_KEY` env var
- Publishable Key: `pk_test_...` → Goes in Medusa payment provider config AND frontend env var

**Live Keys (Production):**
- Secret Key: `sk_live_...` → Replace test key when going live
- Publishable Key: `pk_live_...` → Replace test key when going live

### Security Notes:

- ❌ **NEVER** commit Stripe secret keys to Git
- ❌ **NEVER** expose secret keys in frontend code
- ✅ Secret keys only in backend (Medusa) environment variables
- ✅ Publishable keys are safe to use in frontend (they're meant to be public)

### Medusa Payment Provider Setup:

Medusa uses payment providers as plugins. Stripe is typically included by default, but you need to:
1. Configure it with your API keys
2. Enable it for your region
3. Ensure it's linked to your sales channel

---

## 🚀 Step 2: Install Stripe.js and Configure Environment Variables (NEXT STEP)

Now that Stripe is configured in Medusa backend, we need to set up the frontend to handle payments.

### What We Need to Do:

1. **Install Stripe.js Package:**
   ```bash
   npm install @stripe/stripe-js
   ```

2. **Add Stripe Publishable Key to Vercel:**
   - Go to Vercel → Your Project → Settings → Environment Variables
   - Add: `STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here`
   - Use Test publishable key for development (starts with `pk_test_`)
   - Apply to Production, Preview, and Development environments

3. **Update `nuxt.config.ts`:**
   ```typescript
   runtimeConfig: {
     public: {
       // ... existing config
       stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
     }
   }
   ```

### Expected Outcome:

✅ `@stripe/stripe-js` package installed  
✅ `STRIPE_PUBLISHABLE_KEY` environment variable set on Vercel  
✅ Publishable key exposed in `nuxt.config.ts`  
✅ Ready to create checkout page

---

## 🐛 Troubleshooting

### Issue: "Payment provider not found"
- **Solution:** Ensure `@medusajs/payment-stripe` is installed in Medusa backend

### Issue: "Invalid API key"
- **Solution:** Double-check you're using the correct key format (`sk_test_...` for test)
- **Solution:** Ensure the key is in the correct environment variable (`STRIPE_API_KEY`)

### Issue: "Payment provider not enabled"
- **Solution:** Enable the provider in Medusa Admin → Settings → Payment Providers
- **Solution:** Ensure the provider is linked to your region

---

## 📚 Resources

- [Medusa Payment Provider Docs](https://docs.medusajs.com/modules/payments/payment-provider)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [Medusa + Stripe Integration Guide](https://docs.medusajs.com/modules/payments/backend/payment-provider-stripe)

---

---

## 📝 Previous Engineer's Notes (Xclusive Digital Print Solutions)

Based on a working Stripe integration in a previous Medusa project, here are key patterns:

### Key Integration Patterns:

1. **Payment Sessions Created via Medusa API**
   - Use Medusa's payment session endpoints
   - Don't create Stripe sessions directly
   - Let Medusa handle the payment provider abstraction

2. **Client Secret Retrieved from Payment Collection**
   - After creating payment session, get client secret from payment collection
   - Pass client secret to Stripe.js for payment processing
   - Client secret is required for Stripe Elements/Checkout

3. **Stripe.js Loaded Dynamically**
   - Load Stripe.js only when needed (not on every page)
   - Use dynamic imports or load script tag on checkout page only
   - Initialize Stripe client with publishable key

4. **Success Page Handles Cart Clearing**
   - After successful payment, clear cart from localStorage
   - Display order confirmation
   - Handle both success and failure cases

### Implementation Pattern (From Previous Project):

```javascript
// 1. Create payment session via Medusa
const { payment_session } = await medusa.store.payment.createSession(cartId, {
  provider_id: "stripe"
});

// 2. Get client secret from payment collection
const { payment_collection } = await medusa.store.payment.retrieve(payment_session.id);
const clientSecret = payment_collection.data.client_secret;

// 3. Initialize Stripe with client secret
const stripe = await loadStripe(publishableKey);
await stripe.confirmPayment({
  clientSecret: clientSecret,
  // ... other options
});

// 4. After success, clear cart
localStorage.removeItem('cart_id');
```

**Current Status:** ✅ Step 2 mostly complete → Need to add STRIPE_PUBLISHABLE_KEY to Vercel → Then create checkout page  
**Last Updated:** January 2025

