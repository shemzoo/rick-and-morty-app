import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const favoritesRemoteUrl =
    env.VITE_FAVORITES_REMOTE_URL ||
    (mode === 'production'
      ? 'https://<github-user>.github.io/rick-and-morty-app-microfront/assets/remoteEntry.js'
      : 'http://localhost:5001/assets/remoteEntry.js');

  return {
    plugins: [
      react(),
      svgr(),
      federation({
        name: 'host_app',
        remotes: {
          remote_app: favoritesRemoteUrl
        },
        shared: {
          react: {
            requiredVersion: '^19.1.1',
            version: '19.1.1'
          },
          'react-dom': {
            requiredVersion: '^19.1.1',
            version: '19.1.1'
          }
        }
      }),
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
          start_url: '/rick-and-morty-app/',
          scope: '/rick-and-morty-app/',
          orientation: 'portrait',
          lang: 'ru-RU',
          screenshots: [
            {
              src: 'screenshots/desktop.png',
              type: 'image/png',
              sizes: '1899x826',
              form_factor: 'wide'
            },
            {
              src: 'screenshots/mobile.png',
              type: 'image/png',
              sizes: '386x687',
              form_factor: 'narrow'
            }
          ],
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ],
    server: {
      host: true
    },
    base: process.env.NODE_ENV === 'production' ? '/rick-and-morty-app/' : '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  };
});
