# Robert Gaunce Art

A server-side rendered (SSR) portfolio and e-commerce website for watercolor artist Robert Gaunce, built with Nuxt 3 and integrated with Medusa.js for e-commerce functionality.

## 🎨 About

Robert Gaunce is a watercolor artist based in Paris, Kentucky, specializing in nature, wildlife, and portrait commissions. This website showcases his portfolio, accepts commission inquiries, and offers previous works for sale.

## 🚀 Tech Stack

- **Frontend**: Nuxt 3 (SSR), Vue 3, TypeScript
- **UI Components**: Tailwind CSS
- **State Management**: Pinia
- **E-commerce**: Medusa.js (backend separate)
- **Images**: @nuxt/image with optimization
- **SEO**: @nuxtjs/seo with structured data
- **Hosting**: Vercel

## 📁 Project Structure

```
├── website/              # Nuxt 3 application
│   ├── assets/          # Stylesheets, fonts
│   ├── components/      # Vue components
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages
│   ├── plugins/         # Nuxt plugins
│   ├── public/          # Static assets
│   └── stores/          # Pinia stores
└── .moat/              # Drawbridge task management
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Getting Started

```bash
# Install dependencies
cd website
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000`

### Build for Production

```bash
cd website
npm run build
npm run preview
```

## 🌐 Deployment

The site is configured for Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect Nuxt 3 and use the `vercel.json` configuration
3. Set environment variables (if needed):
   - `SITE_URL`: Your production domain
   - `MEDUSA_BACKEND_URL`: Medusa backend URL (when ready)
   - `MEDUSA_API_KEY`: Medusa API key (when ready)

## 📄 Pages

- **Home** (`/`): Hero section with featured artwork
- **Portfolio** (`/portfolio`): Bento box gallery of all artwork
- **About** (`/about`): Artist biography and statement
- **Commissions** (`/commissions`): Commission inquiry form and process
- **Shop** (`/shop`): E-commerce integration (Medusa)
- **Contact** (`/contact`): Contact form and information

## 🎯 Features

- ✅ Server-side rendering for SEO
- ✅ Local SEO optimization (Paris/Lexington, KY)
- ✅ Responsive design (mobile-first)
- ✅ Image optimization (WebP/AVIF)
- ✅ Bento box portfolio layout
- ✅ Commission inquiry system
- ✅ Medusa.js e-commerce integration (ready)
- ✅ Structured data (Schema.org)
- ✅ Sitemap generation
- ✅ Drawbridge visual task management

## 📝 Artist Info

**Robert Gaunce**
- Location: Paris, Kentucky
- Medium: Watercolor (line and wash technique)
- Specialties: Nature, Wildlife, Portrait Commissions
- Education: Bachelor of Arts in Art Area, Morehead State University (2013-2017)

## 🔗 Links

- GitHub: [https://github.com/MarketLou/Robert-Gaunce-Art](https://github.com/MarketLou/Robert-Gaunce-Art)

## 📧 Contact

For inquiries about artwork or commissions, please visit the website contact page.

---

Built with ❤️ using Nuxt 3

