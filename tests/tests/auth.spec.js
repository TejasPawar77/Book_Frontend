import { test, expect } from '@playwright/test';

const API_BASE_URL = 'http://127.0.0.1:8000/api/auth';

test.describe.serial('Django REST Framework Authentication API', () => {
  const testUser = {
    username: `testuser_${Date.now()}`,
    email: `test_${Date.now()}@example.com`,
    password: 'SecurePassword123!',
  };

  let accessToken = '';
  let refreshToken = '';

  test('1. Should register a new user successfully', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/register/`, {
      data: {
        username: testUser.username,
        email: testUser.email,
        password: testUser.password,
      },
    });

    if (!response.ok()) {
      console.log('Register Error Response:', await response.text());
    }

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('username', testUser.username);
  });

  test('2. Should log in and obtain JWT access and refresh tokens', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/login/`, {
      data: {
        username: testUser.username,
        password: testUser.password,
      },
    });

    if (!response.ok()) {
      console.log('Login Error Response:', await response.text());
    }

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('access');
    expect(responseBody).toHaveProperty('refresh');

    accessToken = responseBody.access;
    refreshToken = responseBody.refresh;
  });

  test('3. Should refresh the access token using the refresh token', async ({ request }) => {
    expect(refreshToken).toBeTruthy();

    const response = await request.post(`${API_BASE_URL}/token/refresh/`, {
      data: {
        refresh: refreshToken,
      },
    });

    if (!response.ok()) {
      console.log('Refresh Error Response:', await response.text());
    }

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('access');
    expect(responseBody.access).not.toEqual(accessToken);
  });

  test('4. Should fail login with incorrect credentials', async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/login/`, {
      data: {
        username: testUser.username,
        password: 'WrongPassword!',
      },
    });

    expect(response.status()).toBe(401);
  });
});