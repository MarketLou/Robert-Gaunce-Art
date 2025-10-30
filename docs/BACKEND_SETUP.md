# Backend Setup Requirements

This document outlines what needs to be configured on the **Medusa Backend** (Railway) for the frontend to work properly.

## 📋 Backend Configuration Progress

### ✅ Completed Steps:
1. ✅ **Added USD currency** - Set as default currency
2. ✅ **Removed EURO currency** - Cleaned up unused currency
3. ✅ **Created Region** - Set up region for cart functionality
4. ✅ **Environment Variables Configured on Vercel** - Backend URL and Publishable Key set
5. ✅ **Cart functionality working** - Cart creation successful

### ⏳ Steps In Progress:
- [x] Create test products with images (Product added to Medusa)
- [ ] Fix products API endpoint (500 error - investigating)
- [ ] Configure payment provider (Stripe)
- [ ] Set up shipping options
- [ ] Configure tax rates

### 🐛 Current Issues:
- **✅ IDENTIFIED: Publishable key needs sales channel configured**
  - Error: `"Publishable key needs to have a sales channel configured"`
  - Fix: Backend must link the publishable key to a sales channel in Medusa Admin
  - Location: Settings → Publishable API Keys → Edit → Link to Sales Channel

### 📝 Notes:
- Backend URL: `https://robert-gaunce-art-medusa-production.up.railway.app`
- Publishable Key: Configured and working
- Region created is required for cart functionality

---

## ✅ Step 1 Completed: Frontend API Routes Created

We've successfully created server-side API routes that will communicate with your Medusa backend:

- ✅ `/server/api/products/index.get.ts` - Fetches all products
- ✅ `/server/api/products/[id].get.ts` - Fetches a single product by ID
- ✅ `/composables/useProducts.ts` - Composable for product listings (SEO-friendly)
- ✅ `/composables/useProduct.ts` - Composable for single product pages (SEO-friendly)

## 🎯 Backend Setup Checklist

### 1. **⚠️ PARTIALLY DONE - Create and Configure Publishable API Key**

⚠️ **Status: NEEDS SALES CHANNEL CONFIGURATION**

Publishable API key exists but needs configuration:
- Key: `pk_495a905d39e83ee4957af90c6605fda76d4d07412c152a22ff12408afe1cf195`
- Frontend is configured with this key
- **❌ Missing: Sales Channel association**
  
**Required Action:**
1. Log into Medusa Admin
2. Settings → Publishable API Keys
3. Edit the key
4. Link to "Default Sales Channel" (or create one)
5. Ensure products are published to the same channel
6. Save changes

### 2. **✅ DONE - Region Configuration**

✅ **Status: COMPLETED**

Region has been configured in Medusa:
- Currency: USD (default)
- EURO removed
- Region created and active

**Why this matters:** Carts require at least one region to function. Without a region, the cart creation fails with "Page not found: /store/carts"

### 3. **Ensure Medusa Store API is Accessible**

The frontend needs access to these Medusa Store API endpoints:

```
GET /store/products
GET /store/products/:id
```

**Backend Task:** Verify these endpoints work with the publishable key:

```bash
# Test fetching all products (replace YOUR_PUBLISHABLE_KEY)
curl -H "x-publishable-api-key: YOUR_PUBLISHABLE_KEY" \
  https://robert-gaunce-art-medusa-production.up.railway.app/store/products

# Test fetching a single product (replace {id} with actual product ID)
curl -H "x-publishable-api-key: YOUR_PUBLISHABLE_KEY" \
  https://robert-gaunce-art-medusa-production.up.railway.app/store/products/{id}
```

### 4. **CORS Configuration** (CRITICAL)

Since the Nuxt frontend will be calling the Medusa backend from a different domain, CORS must be configured.

**Backend Task:** Add the frontend domain to Medusa's CORS settings.

In your Medusa `medusa-config.js`:

```javascript
module.exports = {
  projectConfig: {
    // ... other config
    store_cors: process.env.STORE_CORS || "http://localhost:3000,https://robertgaunceart.com,https://www.robertgaunceart.com",
  },
}
```

**Environment Variable to Set on Railway:**
```
STORE_CORS=http://localhost:3000,https://robertgaunceart.com,https://www.robertgaunceart.com
```

### 5. **Product Data Requirements**

For artwork to display properly on the frontend, each product in Medusa should have:

**Required Fields:**
- `id` - Product ID (auto-generated)
- `title` - Artwork title
- `description` - Artwork description
- `thumbnail` - Main image URL
- `handle` - URL-friendly slug (e.g., "watercolor-orchids")

**Recommended Fields:**
- `images[]` - Array of image objects
  - `url` - Image URL
- `variants[]` - Product variants (size, framed/unframed, etc.)
  - `id` - Variant ID
  - `title` - Variant title (e.g., "8x10 Unframed")
  - `prices[]` - Array of prices
    - `amount` - Price in cents (e.g., 5000 for $50.00)
    - `currency_code` - Currency (e.g., "usd")
- `collection_id` - Optional: group by collection (e.g., "Watercolors", "Pet Portraits")
- `metadata` - Optional: custom fields
  - `medium` - "Watercolor", "Acrylic", etc.
  - `dimensions` - "11x14 inches"
  - `year` - "2024"

### 6. **Image Hosting**

**Backend Task:** Decide how product images will be hosted:

**Option A: Medusa File Service (Recommended)**
- Configure Medusa to use a file service (S3, MinIO, etc.)
- Upload images through Medusa Admin
- Images served from your cloud storage

**Option B: External CDN**
- Upload images to Cloudinary, imgix, or similar
- Add image URLs to products in Medusa

### 7. **Test Products** ⏳ IN PROGRESS

**Backend Task:** Create at least 2-3 test products with:
- Title (e.g., "Watercolor Orchids")
- Description (e.g., "Beautiful orchid watercolor painting...")
- At least one image
- At least one variant with a price

### 8. **Integration Status**

**✅ Completed:**
1. Railway Backend URL: `https://robert-gaunce-art-medusa-production.up.railway.app`
2. Publishable API Key: Configured
3. Region: Created with USD currency
4. Currency: USD set as default

**⏳ Pending:**
1. Test products with images and prices
2. CORS configuration for frontend domain
3. Sample product IDs for testing
4. Shipping options configuration
5. Stripe payment configuration

## 📝 Frontend Configuration

Once backend provides the publishable API key, we need to:

1. Create a `.env` file in the frontend project root:
   ```bash
   MEDUSA_BACKEND_URL=https://robert-gaunce-art-medusa-production.up.railway.app
   MEDUSA_PUBLISHABLE_KEY=pk_YOUR_KEY_HERE
   ```

   > **Note:** Copy the `.env.example` file and fill in the actual key

2. Test the connection by running the dev server:
   ```bash
   npm run dev
   ```

3. Visit `http://localhost:3000/api/products` to test if products load

## 🔄 Next Steps

**After Backend Setup is Complete:**

1. ✅ Step 1: Server API Routes (COMPLETED)
2. 🎯 Step 2: Update Shop/Portfolio Pages to use the new composables
3. 🎯 Step 3: Connect Cart Store for client-side cart operations
4. 🎯 Step 4: Add product detail pages
5. 🎯 Step 5: Implement checkout flow

## 🐛 Testing Checklist

### Backend Testing
- [ ] `/store/products` endpoint returns JSON with products array
- [ ] `/store/products/{id}` endpoint returns single product
- [ ] CORS headers are present in responses
- [ ] Images are accessible (URLs work)
- [ ] At least 3 test products exist with images and prices

### Frontend Testing (After backend is ready)
- [ ] Environment variable `MEDUSA_BACKEND_URL` is set
- [ ] Dev server starts without errors
- [ ] `/api/products` returns products from backend
- [ ] No CORS errors in browser console

## 📞 Questions for Backend Team

Please answer these for the frontend team:

1. ✅ **Railway Medusa backend URL?** 
   - Received: `https://robert-gaunce-art-medusa-production.up.railway.app`

2. ⏳ **What is the Publishable API Key?** (CRITICAL - NEEDED NOW)
   - Go to: Medusa Admin → Settings → Publishable API Keys
   - Copy the key that starts with `pk_`

3. **Are products already created, or do we need to wait?**

4. **Are images hosted, and are they accessible?**

5. **Has CORS been configured for the frontend domain?**
   - Need: `http://localhost:3000,https://robertgaunceart.com`

6. **Do you have sample product IDs we can test with?**

## 🔗 Useful Medusa Documentation

- [Medusa Store API Reference](https://docs.medusajs.com/api/store)
- [Product API](https://docs.medusajs.com/api/store#products)
- [CORS Configuration](https://docs.medusajs.com/development/backend/configurations#store_cors)

