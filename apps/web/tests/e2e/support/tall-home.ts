import type { Page } from '@playwright/test';

/**
 * The seeded home is short: `#contacto` can sit close enough to the top to
 * look "reached" without any scrolling. Stretching the hero puts it several
 * screens down, like the real home, so a test fails when a cross-page link to
 * `/#contacto` leaves the visitor at the top.
 *
 * Call it on the page the navigation starts from: the style tag survives
 * client-side navigation, which is the case under test.
 */
export async function stretchHome(page: Page): Promise<void> {
  await page.addStyleTag({ content: '[data-testid="home-hero"] { min-height: 400vh !important; }' });
}
