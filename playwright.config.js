import { chromium, defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1',
    url: 'http://127.0.0.1:5173/99-brazil-superapp-demo/',
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://127.0.0.1:5173/99-brazil-superapp-demo/',
    launchOptions: { executablePath: chromium.executablePath() },
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'mobile-chromium',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
