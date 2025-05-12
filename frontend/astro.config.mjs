// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'server',
  adapter: vercel({}),
  server: {
    port: 3000,
  },
  vite: {
    ssr: {
      noExternal: ['react-icons', '@apollo/client'],
    },
    resolve: {
      mainFields: ['module', 'jsnext:main', 'jsnext'],
    },
    optimizeDeps: {
      include: ['@apollo/client']
    }
  }
});