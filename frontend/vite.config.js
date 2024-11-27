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
        name: 'LuckDuck jogos da sorte',
        short_name: 'LuckDuck',
        start_url: '/',
        description: 'É um projeto para jogos da sorte',
        theme_color: '#FFD700',
        background_color: '#1C1C1C',
        display: 'standalone',
        icons: [
          {
            src: '/icons/icon-192x192-transparent2.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512-transparent2.png',
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
