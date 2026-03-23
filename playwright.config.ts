import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    trace: 'on-first-retry'
  },

  projects: [
    {
      name: 'e2e-chromium',
      testDir: './tests',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:5173'
      },
      webServer: {
        command: 'npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: !process.env.CI
      }
    },

    {
      name: 'screenshot-chromium',
      testMatch: /src\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:6006',
        viewport: { width: 1280, height: 720 }
      }
    }
  ]
});
