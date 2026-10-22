import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.VITE_API_BASE_URL;

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${API_BASE_URL}`);
  });

  test('should display login page', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'WELCOME BACK' })
    ).toBeVisible();

    await expect(
      page.getByText('Enter your credentials to access your account')
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'LOG IN' })
    ).toBeVisible();
  });

  test('should allow user to enter email and password', async ({ page }) => {
    const email = page.getByPlaceholder('YOU@EXAMPLE.COM');
    const password = page.getByPlaceholder('••••••••');

    await email.fill('test@gmail.com');
    await password.fill('Password123');

    await expect(email).toHaveValue('test@gmail.com');
    await expect(password).toHaveValue('Password123');
  });

  test('should show and hide password', async ({ page }) => {
    const password = page.getByPlaceholder('••••••••');

    await expect(password).toHaveAttribute('type', 'password');

    const togglePasswordBtn = page.locator('button[type="button"]').first();

    await togglePasswordBtn.click();
    await expect(password).toHaveAttribute('type', 'text');

    await togglePasswordBtn.click();
    await expect(password).toHaveAttribute('type', 'password');
  });

  test('should allow user to select Remember Me', async ({ page }) => {
    const checkbox = page.locator('#remember');

    await expect(checkbox).not.toBeChecked();

    await checkbox.check();

    await expect(checkbox).toBeChecked();
  });

  test('should submit login form', async ({ page }) => {
    await page.getByPlaceholder('YOU@EXAMPLE.COM')
      .fill('test@gmail.com');

    await page.getByPlaceholder('••••••••')
      .fill('Password123');

    await page.getByRole('button', { name: 'LOG IN' }).click();
  });

  test('should navigate to Sign Up page', async ({ page }) => {
    const signUpLink = page.getByRole('link', { name: /sign\s*up/i });
    await expect(signUpLink).toBeVisible();
    await signUpLink.click();

    await page.waitForURL('**/signup');

    await expect(
      page.getByRole('heading', { name: /sign\s*up/i })
        .or(page.getByText(/create account|sign\s*up/i).first())
    ).toBeVisible();
  });
});