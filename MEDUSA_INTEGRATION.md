# Medusa Integration - Step 1 Complete ✅

## What Was Implemented

We've successfully completed **Step 1: Server API Routes for Product Data** with SEO-friendly server-side rendering.

### Files Created

#### 1. Server API Routes (Backend Communication)
- **`server/api/products/index.get.ts`** - Fetches all products from Medusa
- **`server/api/products/[id].get.ts`** - Fetches single product by ID

These routes run on your Nuxt server and communicate with your Railway Medusa backend.

#### 2. Composables (For Use in Pages)
- **`composables/useProducts.ts`** - Fetch all products with SSR support
- **`composables/useProduct.ts`** - Fetch single product with SSR support

Both composables include:
- ✅ Server-side rendering (SSR) for SEO
- ✅ Smart caching (5-10 minute cache)
- ✅ Automatic refetching
- ✅ Error handling

#### 3. Documentation
- **`docs/BACKEND_SETUP.md`** - Complete guide for backend team

## How to Use in Your Pages

### Example 1: Shop Page (All Products)

```vue
<template>
  <div>
    <h1>Shop</h1>
    
    <!-- Loading state -->
    <div v-if="pending">Loading artwork...</div>
    
    <!-- Error state -->
    <div v-else-if="error">Error loading products</div>
    
    <!-- Products grid -->
    <div v-else class="grid grid-cols-3 gap-4">
      <div v-for="product in products" :key="product.id">
        <img :src="product.thumbnail" :alt="product.title" />
        <h3>{{ product.title }}</h3>
        <p>{{ product.description }}</p>
        <p>${{ (product.variants[0]?.prices[0]?.amount / 100).toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// This will fetch products on the server (SSR) for SEO
const { products, pending, error, refresh } = useProducts()
</script>
```

### Example 2: Product Detail Page

```vue
<template>
  <div>
    <div v-if="pending">Loading...</div>
    
    <div v-else-if="product">
      <img :src="product.thumbnail" :alt="product.title" />
      <h1>{{ product.title }}</h1>
      <p>{{ product.description }}</p>
      
      <!-- Variants -->
      <div v-for="variant in product.variants" :key="variant.id">
        <h3>{{ variant.title }}</h3>
        <p>${{ (variant.prices[0]?.amount / 100).toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const productId = route.params.id

// This will fetch product on the server (SSR) for SEO
const { product, pending, error } = useProduct(productId)
</script>
```

## Configuration Required

### 1. Set Environment Variables

Create a `.env` file in your project root:

```bash
MEDUSA_BACKEND_URL=https://robert-gaunce-art-medusa-production.up.railway.app
MEDUSA_PUBLISHABLE_KEY=pk_01XXXXXXXXXXXXXXXXXXXXXXXXXX
```

> ⚠️ **Important:** 
> - No trailing slash in the URL!
> - The Publishable API Key is REQUIRED for Medusa v2

### 2. Get Your Publishable API Key

**Backend Team:** To get the publishable API key:

1. Log into your Medusa Admin Dashboard (on Railway)
2. Go to **Settings** → **Publishable API Keys**
3. Create a new publishable key or copy an existing one
4. The key will start with `pk_`
5. Provide this key to the frontend team

### 2. Backend Requirements

The backend team needs to:

1. ✅ Ensure `/store/products` endpoint is working
2. ✅ Configure CORS to allow your frontend domain
3. ✅ Add at least 2-3 test products with images

**See `docs/BACKEND_SETUP.md` for full backend requirements.**

## Testing

Once the backend URL is configured:

```bash
# Start dev server
npm run dev

# Test API endpoint directly
curl http://localhost:3000/api/products

# Or visit in browser
http://localhost:3000/api/products
```

You should see JSON with products from your Medusa backend.

## Benefits of This Approach

✅ **SEO Optimized** - Products render on the server, Google can index them  
✅ **Fast Performance** - Server-side caching reduces backend calls  
✅ **Secure** - Backend URL stays on server, never exposed to browser  
✅ **Error Handling** - Graceful fallbacks if backend is down  
✅ **Type Safe** - Full TypeScript support

## Next Steps

### Step 2: Update Shop/Portfolio Pages
- Modify `pages/shop.vue` to use `useProducts()`
- Display real products from Medusa instead of placeholders

### Step 3: Connect Cart Store (Client-Side)
- Wire up `stores/cart.ts` to use Medusa SDK
- Enable "Add to Cart" functionality

### Step 4: Product Detail Pages
- Create dynamic product pages
- Use `useProduct()` composable for individual artworks

### Step 5: Checkout Flow
- Implement cart page
- Add checkout process

## Questions?

If you encounter any issues:
1. Check that `MEDUSA_BACKEND_URL` is set correctly
2. Verify backend is running and accessible
3. Check browser console for CORS errors
4. Review `docs/BACKEND_SETUP.md` for backend requirements

---

**Status:** ✅ Step 1 Complete - Ready for backend configuration

