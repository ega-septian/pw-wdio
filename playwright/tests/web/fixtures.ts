import { test as base } from '@playwright/test';
import { Homepage } from './pages/homepage';

export const test = base.extend<{ homepage: Homepage }>({
  homepage: async ({ page }, use) => {
    await use(new Homepage(page));
  },
});

export { expect } from '@playwright/test';
