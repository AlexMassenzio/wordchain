import { test, expect } from '@playwright/test';

test('Should open and close the tutorial modal', async ({ page }) => {
	await page.goto('http://127.0.0.1:4173/');

	// Open modal
	await page.getByRole('button', { name: '?' }).click();
	await expect(
		page.getByRole('dialog', { name: 'How to Play' }).locator('div').nth(2)
	).toBeVisible();

	// Close modal
	await page.getByRole('button', { name: 'Close' }).click();
	await expect(
		page.getByRole('dialog', { name: 'How to Play' }).locator('div').nth(2)
	).not.toBeVisible();
});

test('Should open the game and navigate to /play', async ({ page }) => {
	await page.goto('http://127.0.0.1:4173/');
	await page.getByRole('link', { name: 'Play' }).click();

	await expect(page).toHaveURL(/\/play$/);
});
