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
        name: 'LuckDuck jogos da sorte', // Nome completo do aplicativo
        short_name: 'LuckDuck', // Nome curto para exibição em espaços reduzidos
        start_url: '/', // URL inicial ao abrir o PWA
        scope: '/', // Escopo de navegação do PWA
        description: 'É um projeto para jogos da sorte', // Descrição do aplicativo
        theme_color: '#FFD700', // Cor da barra de status e do tema
        background_color: '#1C1C1C', // Cor de fundo durante a inicialização
        display: 'standalone', // Exibição como aplicativo sem barra de navegador
        icons: [
          {
            src: '/icons/icon-192x192-transparent2.png', // Ícone menor (notificações, atalhos)
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512-transparent2.png', // Ícone grande (tela inicial)
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
