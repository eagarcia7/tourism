# Tourism Website

A modern, performant tourism and travel destinations website built with Astro frontend and Strapi backend.

## 📋 Project Overview

This project is a tourism website that showcases destinations, activities, and travel planning tools using a modern JAMstack architecture:

- **Frontend**: 
  - [Astro](https://astro.build/) for fast, content-focused static site generation
  - React components for interactive UI elements
  - TypeScript for type safety
  - Tailwind CSS for styling

- **Backend**: 
  - [Strapi](https://strapi.io/) headless CMS
  - RESTful API endpoints for destinations, activities, and events
  - TypeScript for type safety
  - PostgreSQL database (configurable)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Git
- Database: PostgreSQL (recommended) or SQLite

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tourism.git
   cd tourism
   ```

2. Install dependencies for both Astro frontend and Strapi backend:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install Strapi backend dependencies
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Frontend .env file
   cp frontend/.env.example frontend/.env

   # Strapi backend .env file
   cp backend/.env.example backend/.env
   ```

4. Configure the Strapi database:
   ```bash
   cd backend
   npm run db:migrate
   npm run db:seed # Optional: seed with sample data
   ```

## 🏗️ Project Structure

```
tourism/
├── .vscode/           # VS Code configuration
├── backend/           # Strapi backend
│   ├── config/        # Strapi configuration
│   │   ├── admin.ts   # Admin panel config
│   │   ├── api.ts     # API config
│   │   ├── database.ts# Database config
│   │   ├── middlewares.ts # Middleware config
│   │   ├── plugins.ts # Plugins config
│   │   └── server.ts  # Server config
│   ├── src/           # Strapi source code
│   │   ├── admin/     # Admin panel customization
│   │   ├── api/       # API endpoints
│   │   │   ├── destination/ # Destination content type
│   │   │   ├── event/       # Event content type
│   │   │   └── holiday/     # Holiday content type
│   │   └── extensions/  # Strapi extensions
│   ├── database/      # Database migrations
│   └── public/        # Public assets for Strapi
├── frontend/          # Astro frontend
│   ├── src/           # Frontend source code
│   │   ├── assets/    # Static assets
│   │   ├── components/# UI components
│   │   │   ├── activities/    # Activity-related components
│   │   │   ├── common/        # Shared components
│   │   │   ├── destinations/  # Destination components
│   │   │   ├── layout/        # Layout components
│   │   │   ├── planning/      # Travel planning components
│   │   │   └── ui/            # UI components
│   │   ├── data/      # Mock data
│   │   ├── layouts/   # Astro layouts
│   │   ├── lib/       # Utility functions
│   │   ├── pages/     # Astro pages
│   │   ├── services/  # API service functions
│   │   ├── styles/    # CSS styles
│   │   ├── templates/ # Page templates
│   │   └── types/     # TypeScript type definitions
│   ├── public/        # Public static assets
│   └── astro.config.mjs # Astro configuration
```

## ⚙️ Configuration

### Strapi Backend Configuration

1. Database Configuration (in `backend/config/database.ts`):
   ```typescript
   export default ({ env }) => ({
     connection: {
       client: 'postgres', // or 'sqlite', 'mysql'
       connection: {
         host: env('DATABASE_HOST', '127.0.0.1'),
         port: env.int('DATABASE_PORT', 5432),
         database: env('DATABASE_NAME', 'tourism'),
         user: env('DATABASE_USERNAME', 'strapi'),
         password: env('DATABASE_PASSWORD', 'strapi'),
       },
     },
   });
   ```

2. Server Configuration (in `backend/config/server.ts`):
   ```typescript
   export default ({ env }) => ({
     host: env('HOST', '0.0.0.0'),
     port: env.int('PORT', 1337),
   });
   ```

3. Middleware Configuration (in `backend/config/middlewares.ts`):
   - Ensure CORS is properly configured for your Astro frontend:
   ```typescript
   export default [
     'strapi::errors',
     {
       name: 'strapi::cors',
       config: {
         origin: ['http://localhost:3000', 'https://your-production-site.com'],
         methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
         headers: ['Content-Type', 'Authorization', 'Origin'],
         keepHeaderOnError: true,
       },
     },
     // Other middlewares...
   ];
   ```

### Astro Frontend Configuration

1. Astro Configuration (in `frontend/astro.config.mjs`):
   ```javascript
   import { defineConfig } from 'astro/config';
   import tailwind from '@astrojs/tailwind';
   import react from '@astrojs/react';

   export default defineConfig({
     // Configure site URL
     site: 'https://yoursite.com',
     
     // Configure integrations
     integrations: [
       tailwind(),
       react()
     ],
     
     // Configure output mode (static, server, or hybrid)
     output: 'hybrid'
   });
   ```

2. API Service Configuration (in `frontend/src/services/api.ts`):
   ```typescript
   const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:1337';
   
   export async function fetchDestinations(params = {}) {
     // Implementation...
   }
   
   export async function fetchActivities(params = {}) {
     // Implementation...
   }
   
   // Other API service functions...
   ```

3. Environment variables (in `frontend/.env`):
   ```
   PUBLIC_API_URL=http://localhost:1337
   PUBLIC_MEDIA_URL=http://localhost:1337
   ```

## 🖥️ Development

Start both the Astro frontend and Strapi backend in development mode:

```bash
# Start Strapi backend (from backend directory)
npm run develop

# Start Astro frontend (from frontend directory)
npm run dev
```

- Strapi backend will be available at: http://localhost:1337
- Astro frontend will be available at: http://localhost:3000
- Strapi admin panel will be available at: http://localhost:1337/admin

## 🔧 Available Scripts

### Strapi Backend

- `npm run develop`: Start Strapi development server
- `npm run start`: Start Strapi production server
- `npm run build`: Build Strapi for production
- `npm run strapi`: Run Strapi CLI commands
- `npm run db:migrate`: Run database migrations (if custom script)

### Astro Frontend

- `npm run dev`: Start Astro development server
- `npm run build`: Build Astro for production
- `npm run preview`: Preview Astro production build locally
- `npm run astro`: Run Astro CLI commands

## 🚢 Deployment

### Strapi Backend Deployment

1. Build the Strapi backend:
   ```bash
   cd backend
   npm run build
   ```

2. Start the production server:
   ```bash
   NODE_ENV=production npm run start
   ```

Alternatively, deploy to a Strapi-compatible hosting platform such as:
- Heroku
- DigitalOcean App Platform
- Railway
- Render

### Astro Frontend Deployment

1. Update the production API URL in your environment variables
2. Build the Astro frontend:
   ```bash
   cd frontend
   npm run build
   ```

3. Deploy the `dist` directory to a static hosting provider such as:
   - Netlify
   - Vercel
   - GitHub Pages
   - Cloudflare Pages

## 📁 Content Structure in Strapi

### Destinations
Destinations are the main content type, representing locations that visitors can explore.
- Fields: name, slug, description, image, location, activities, etc.

### Activities
Activities are things to do at destinations, such as sightseeing, tours, or experiences.
- Fields: title, slug, description, image, price range, duration, category, etc.

### Events
Events are time-specific happenings at destinations, such as festivals or special occasions.
- Fields: title, date, description, location, etc.

## 🧩 Component Usage in Astro Frontend

### Common Components
- `Icon.astro` / `Icon.tsx`: Unified icon system for both Astro and React components
- `ImageWithFallback.tsx`: Handle different image formats with fallbacks
- `Badge.tsx`: Display category or status labels
- `ArrowLink.tsx`: Animated link component
- `ErrorMessage.tsx`: Standardized error display

### UI Components
- `ActivityCard.tsx`: Display activity previews
- `FilterButton.tsx`: Interactive category filters
- `DestinationCard.tsx`: Display destination previews
- `InfoSection.tsx`: Standardized content section

### Astro-specific Components
- `Breadcrumbs.astro`: Navigation breadcrumbs
- `HeroSection.astro`: Hero banner for pages
- `InfoCard.astro`: Information card component
- `Icon.astro`: Icon component for Astro pages

## 📚 Adding New Content

### Strapi Backend (CMS)
1. Log in to the Strapi admin panel at `/admin`
2. Navigate to the appropriate content type
3. Click "Create new entry"
4. Fill in the required fields and publish
5. The content will be available via the API

### Astro Frontend
To add a new page:
1. Create a new `.astro` file in the `src/pages` directory
2. Use the appropriate layout and components
3. Fetch data from the Strapi API or use mock data during development:
   ```astro
   ---
   import Layout from '../layouts/MainLayout.astro';
   import { fetchDestinations } from '../services/api';
   
   const destinations = await fetchDestinations();
   ---
   
   <Layout title="Destinations">
     <h1>Explore Destinations</h1>
     <!-- Your page content -->
   </Layout>
   ```

## 🔄 Type Safety Between Frontend and Backend

To ensure type safety between Strapi and Astro:

1. Export type definitions from the Strapi API
2. Import and use these types in your Astro frontend
3. Use the shared `types` directory to store common interfaces

Example type definition in `frontend/src/types/api.ts`:
```typescript
export interface Destination {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description: string;
    image: {
      data: {
        attributes: {
          url: string;
        }
      }
    };
    // Other fields...
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.