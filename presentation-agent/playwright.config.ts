import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  timeout: 30_000,
  expect: {
    timeout: 5_000
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
  use: {
    browserName: 'chromium',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: {
        viewport: { width: 1366, height: 768 }
      }
    },
    {
      name: 'chromium-mobile',
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true
      }
    }
  ]
});
