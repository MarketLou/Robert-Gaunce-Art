# Robert Gaunce Art Website

A Nuxt 3 SSR website for watercolor artist Robert Gaunce, featuring portfolio showcase, commission booking, and e-commerce integration via Medusa.

## Tech Stack

- **Framework**: Nuxt 3 (SSR-first)
- **UI Components**: shadcn-vue
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **E-commerce**: Medusa JS SDK
- **Image Optimization**: @nuxt/image
- **SEO**: @nuxtjs/seo

## Features

- ✅ Server-Side Rendering (SSR) for optimal SEO
- ✅ Local SEO optimization for Paris/Lexington, Kentucky
- ✅ Portfolio gallery with category filtering
- ✅ Commission request system
- ✅ E-commerce integration (ready for Medusa backend)
- ✅ Responsive, mobile-first design
- ✅ Artwork showcase and detail pages
- ✅ Contact forms

## Project Structure

```
website/
├── app/               # App configuration
├── assets/            # Static assets (CSS, images)
│   └── css/           # Global styles
├── components/        # Vue components
│   ├── ui/           # shadcn-vue components
│   ├── AppHeader.vue  # Navigation
│   └── AppFooter.vue # Footer
├── layouts/           # Layout components
├── pages/             # Route pages
├── plugins/           # Nuxt plugins
├── stores/            # Pinia stores
├── composables/       # Vue composables
└── public/            # Public assets

```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
SITE_URL=https://robertgaunceart.com
MEDUSA_BACKEND_URL=https://your-medusa-backend.com
MEDUSA_API_KEY=your_publishable_api_key
```

### Development

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to view the website.

### Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Pages

- `/` - Home page with featured artwork
- `/portfolio` - Artwork gallery with filtering
- `/commissions` - Commission request form
- `/shop` - E-commerce shop (connects to Medusa)
- `/about` - Artist bio and information
- `/contact` - Contact form

## SEO Configuration

The site is configured with:
- Meta tags for all pages
- OpenGraph and Twitter Card support
- Automatic sitemap generation
- robots.txt configuration
- Structured data markup ready

## Medusa Integration

The website is ready to connect to a Medusa backend. The Medusa backend should be built separately.

### Setup Medusa Backend

1. Create a separate folder for the Medusa backend
2. Initialize Medusa
3. Configure products and inventory
4. Set up payment providers (Stripe, etc.)
5. Get the backend URL and API key
6. Update `.env` with the Medusa credentials

### Cart & Checkout

The cart functionality is implemented in `stores/cart.ts` and will connect to Medusa once the backend is ready.

## Deployment

### Vercel

1. Push to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables

Set these in your deployment platform:
- `SITE_URL` - Your domain URL
- `MEDUSA_BACKEND_URL` - Medusa backend URL
- `MEDUSA_API_KEY` - Medusa publishable API key

## Next Steps

1. Build the Medusa backend in a separate folder
2. Add real artwork images
3. Configure email service for contact forms
4. Set up payment processing
5. Add analytics (Google Analytics 4)
6. Optimize images and performance

## Author

Robert Gaunce - Watercolor Artist  
Paris, Kentucky
