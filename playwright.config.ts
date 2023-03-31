import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reporter: "html",
  use: {
    headless: true,
    screenshot: "on",
    video: "on"
  },
  globalSetup: "src/utils/globalSetup.ts"
};

export default config;