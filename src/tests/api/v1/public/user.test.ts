import { prisma } from '../../../../infra/database/prisma.js';

describe('POST /login', () => {
  it('should return a JWT token', async () => {
    const response = await fetch(`${process.env.BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'user@email.com',
        password: 'password123',
      }),
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('email');
    expect(body).toHaveProperty('token');
  });
});

describe('POST /register', () => {
  it('should create a new user and return a JWT token', async () => {
    const response = await fetch(`${process.env.BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'User',
        email: 'userregistered@example.com',
        password: 'newpassword123',
      }),
    });

    const body = await response.json();
    expect(response.status).toBe(201);
    expect(body).toHaveProperty('id');
  });
});

afterAll(async () => {
  await prisma.user.delete({
    where: {
      email: 'userregistered@example.com',
    },
  });
});
