import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png',
      ],
      manifest: {
        name: 'LuckDuck jogos da sorte!!!!!',
        short_name: 'LuckDuck',
        description: 'É um projeto para jogos da sorte',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: "/",
        icons: [
          {
            src: '/icons/icon-192x192-transparent3.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512-transparent3.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  build: {
    outDir: './frontend/dist',
  },
});

