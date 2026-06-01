import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const artifactsDir = path.resolve(__dirname, '../../artifacts/html');
const deckFiles = fs
  .readdirSync(artifactsDir)
  .filter((fileName) => fileName.endsWith('.html'))
  .filter((fileName) => fs.readFileSync(path.join(artifactsDir, fileName), 'utf8').includes('pa-slide'))
  .sort();

test.describe('generated HTML presentation decks', () => {
  for (const deckFile of deckFiles) {
    test(`${deckFile} renders, navigates, and exposes presenter controls`, async ({ page }) => {
      const deckUrl = pathToFileURL(path.join(artifactsDir, deckFile)).href;

      await page.goto(deckUrl);

      const slides = page.locator('.pa-slide');
      const slideCount = await slides.count();
      expect(slideCount).toBeGreaterThan(0);

      const activeSlide = page.locator('.pa-slide.is-active');
      await expect(activeSlide).toBeVisible();
      await expect(activeSlide.locator('h1')).toBeVisible();

      const activeSlideText = await activeSlide.innerText();
      expect(activeSlideText.trim().length).toBeGreaterThan(20);

      const activeSlideBox = await activeSlide.boundingBox();
      expect(activeSlideBox?.width ?? 0).toBeGreaterThan(250);
      expect(activeSlideBox?.height ?? 0).toBeGreaterThan(160);

      await expect(page.locator('.pa-controls')).toBeVisible();
      await expect(page.locator('[data-action="next"]')).toBeVisible();
      await expect(page.locator('[data-action="prev"]')).toBeVisible();
      await expect(page.locator('[data-action="notes"]')).toBeVisible();

      const initialCount = await currentSlideCount(page);
      expect(initialCount).toMatch(new RegExp(`^1 / ${slideCount}$`));

      if (slideCount > 1) {
        await page.keyboard.press('ArrowRight');
        await expect.poll(() => currentSlideCount(page)).toBe(`2 / ${slideCount}`);

        const secondSlideText = await activeSlide.innerText();
        expect(secondSlideText.trim().length).toBeGreaterThan(20);

        await page.keyboard.press('ArrowLeft');
        await expect.poll(() => currentSlideCount(page)).toBe(`1 / ${slideCount}`);
      }

      await page.keyboard.press('s');
      await expect(page.locator('body')).toHaveClass(/show-notes/);
      await expect(page.locator('.pa-presenter')).toBeVisible();
    });

    test(`${deckFile} has no automated axe accessibility violations`, async ({ page }) => {
      const deckUrl = pathToFileURL(path.join(artifactsDir, deckFile)).href;

      await page.goto(deckUrl);

      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    });
  }
});

async function currentSlideCount(page: Page): Promise<string> {
  return page.locator('.pa-count').evaluate((element) => {
    if (element instanceof HTMLOutputElement) {
      return element.value;
    }
    return element.textContent ?? '';
  });
}
