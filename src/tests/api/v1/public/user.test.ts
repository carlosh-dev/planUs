import orchestrator from '../../../orchestrator.js';

describe('POST /login', () => {
  beforeAll(async () => {
    await orchestrator.clearDatabase();

    await fetch(`${process.env.BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'testpassword123',
      }),
    });
  });

  it('deve retornar um token JWT', async () => {
    const response = await fetch(`${process.env.BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'testuser@example.com',
        password: 'testpassword123',
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
  it('deve criar um novo usuário e retornar um token JWT', async () => {
    const response = await fetch(`${process.env.BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'User',
        email: 'usercreated@example.com',
        password: 'newpassword123',
      }),
    });

    const body = await response.json();
    expect(response.status).toBe(201);
    expect(body).toHaveProperty('id');
  });
});
