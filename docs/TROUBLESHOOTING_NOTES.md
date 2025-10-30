# Troubleshooting Notes

## Previous Engineer's Findings (Xclusive Digital Print Solutions)

### Critical Discovery: API Key Must Be Passed Manually

**Date**: January 2025  
**Project**: Xclusive Digital Print Solutions  
**Issue**: Medusa JS SDK v2.8.4 API key handling

### The Problem:

Setting `publishableKey` in the Medusa SDK initialization doesn't work reliably:

```javascript
// ❌ This doesn't always work:
const medusa = new Medusa({
  baseUrl: "https://...",
  publishableKey: "pk_xxxxx"  // Not reliable
});
```

### The Solution:

**Pass the API key as a header parameter with EVERY request:**

```javascript
// ✅ This works reliably:
const medusa = new Medusa({
  baseUrl: "https://..."
  // NO publishableKey here
});

// Pass key with each request:
await medusa.store.cart.retrieve(
  cartId,
  {},
  { "x-publishable-api-key": API_KEY }  // ← 3rd parameter
);

await medusa.store.cart.create(
  {},
  {},
  { "x-publishable-api-key": API_KEY }  // ← 3rd parameter
);
```

### Pattern from Working Implementation:

```javascript
// In plugin
const medusa = new Medusa({
  baseUrl: "https://xclusive-medusa-production.up.railway.app"
  // publishableApiKey removed - must be passed manually
});

// In store/cart operations
const { cart } = await $medusa.store.cart.retrieve(
  this.cartId,
  {},
  { "x-publishable-api-key": API_KEY }
);

const { cart } = await $medusa.store.cart.createLineItem(
  this.cartId,
  payload,
  {},
  { "x-publishable-api-key": API_KEY }
);
```

### Key Takeaway:

**Medusa SDK v2.x requires API key to be passed with each request, not set globally.**

---

## Current Robert Gaunce Art Issue

### Status (as of latest deployment):

**✅ Working:**
- Environment variables configured on Vercel
- Backend URL: `https://robert-gaunce-art-medusa-production.up.railway.app`
- Publishable Key set
- Cart creation working: `cart_01K8VFWJMCEVQ2A4E84KXEZE6P`

**❌ Not Working:**
- `/api/products` endpoint returning 500 error
- Products not loading (0 products)
- Server-side logs not appearing in console

### Hypothesis:

Our server API route may need to pass the publishable key manually in the fetch request, similar to the cart store pattern.

### Current Implementation (May Need Fix):

**File**: `server/api/products/index.get.ts`

```typescript
const response = await fetch(`${backendUrl}/store/products`, {
  headers: {
    'Content-Type': 'application/json',
    'x-publishable-api-key': apiKey,  // ✅ We ARE passing it
  }
})
```

**This SHOULD be correct**, which means the 500 error might be:
1. Network/CORS issue
2. Vercel build/deployment issue
3. Backend Medusa configuration issue
4. Products not properly published in Medusa

### Next Steps to Investigate:

1. Check Vercel function logs for actual server error
2. Test the Medusa endpoint directly with curl
3. Verify products are published in Medusa admin
4. Check if CORS is configured on Medusa backend
5. Consider implementing the manual API key pattern in server routes as well

---

## Lessons from Previous Project

### Cart Implementation:

The previous engineer resolved a dual-cart implementation conflict by:
1. Unifying around CartSidebar component
2. Removing broken desktop cart panel
3. Adding floating cart icon for all devices
4. Ensuring single source of truth for cart state

### Key Patterns to Follow:

1. **Always pass API key with requests** - Don't rely on SDK initialization
2. **Use localStorage for cart persistence** - Store cart ID only
3. **Implement proper error handling** - Retry logic for 404 cart errors
4. **Test across devices** - Mobile and desktop cart behaviors

### Stripe Integration Notes:

- Payment sessions created via Medusa API
- Client secret retrieved from payment collection
- Stripe.js loaded dynamically
- Success page handles cart clearing

---

## Reference: API Key Pattern Comparison

### Old Way (Unreliable):
```javascript
// Plugin
const medusa = new Medusa({
  baseUrl: url,
  publishableKey: key  // ← Set once
});

// Usage
await $medusa.store.products.list();  // ← No key passed
```

### New Way (Reliable):
```javascript
// Plugin
const medusa = new Medusa({
  baseUrl: url
  // No key here
});

// Usage
await $medusa.store.products.list(
  {},
  { "x-publishable-api-key": key }  // ← Pass with each call
);
```

### For Server Routes (Fetch):
```javascript
await fetch(`${url}/store/products`, {
  headers: {
    'x-publishable-api-key': key  // ← Always include
  }
});
```

This pattern ensures consistent API authentication across all Medusa operations.

