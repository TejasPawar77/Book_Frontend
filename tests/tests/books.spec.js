import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.VITE_API_BASE_URL;

test.describe('Testing Books API', () => {
  test('should retrieve a list of all books', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/recommend`);

    expect(response.status()).toBe(200);
    const body = await response.json();

    const books = Array.isArray(body) ? body : body.data;
    expect(Array.isArray(books)).toBeTruthy();
    expect(books.length).toBeGreaterThan(0);
  });
});