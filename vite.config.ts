import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      workbox: {
        globPatterns: ['**/*.{html,css,js,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/rickandmortyapi\.com\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache'
            }
          }
        ]
      },
      manifest: {
        name: 'Rick&Morty PWA App',
        short_name: 'R&M_PWA',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        orientation: 'portrait',
        lang: 'ru-RU',
        icons: [
          {
            src: 'web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: process.env.NODE_ENV === 'production' ? '/rick-and-morty-app/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});

// PWA
// ```ts
// import react from '@vitejs/plugin-react';
// import path from 'path';
// import { defineConfig } from 'vite';
// import { VitePWA } from 'vite-plugin-pwa';
// import svgr from 'vite-plugin-svgr';
// export default defineConfig({
// plugins: [
// react(),
// svgr(),
// VitePWA({
// registerType: 'autoUpdate',
// includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
// workbox: {
// globPatterns: ['**/*.{html,css,js,png,svg}'], // <- особенно обратить внимание
// runtimeCaching: [
// {
// urlPattern: /^https:\/\/rickandmortyapi\.com\/.*$/, // <- особенно обратить внимание
// handler: 'NetworkFirst',
// options: {
// cacheName: 'api-cache'
// }
// }
// ]
// },
// manifest: {
// name: 'Rick&Morty PWA App',
// short_name: 'R&M_PWA',
// description:
// 'PWA приложение со списком персонажей вселенной Рика и Морти',
// theme_color: '#ffffff',
// background_color: '#ffffff',
// display: 'standalone',
// start_url: '/',
// scope: '/',
// orientation: 'portrait',
// lang: 'ru-RU',
// screenshots: [ // <- особенно обратить внимание
// {
// src: '/screenshots/desktop.png',
// type: 'image/png',
// sizes: '2107x1327',
// form_factor: 'wide'
// },
// {
// src: '/screenshots/mobile.png',
// type: 'image/png',
// sizes: '358x740',
// form_factor: 'narrow'
// }
// ],
// icons: [ // <- особенно обратить внимание
// {
// src: 'pwa-192x192.png',
// sizes: '192x192',
// type: 'image/png'
// },
// {
// src: 'pwa-512x512.png',
// sizes: '512x512',
// type: 'image/png'
// },
// {
// src: 'pwa-512x512.png',
// sizes: '512x512',
// type: 'image/png',
// purpose: 'any maskable'
// }
// ]
// }
// })
// ],
// base: '/',
// resolve: {
// alias: {
// '@': path.resolve(__dirname, './src')
// }
// }
// });
// ```
