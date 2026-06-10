import orchestrator from '../../../orchestrator.js';

let loggedUser: {
  id: string;
  name: string;
  token: string;
};

beforeAll(async () => {
  loggedUser = await orchestrator.getToken();
});

describe('POST /family', () => {
  it('it should create a new family', async () => {
    const response = await fetch(`${process.env.BASE_URL}/api/family`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loggedUser.token}`,
      },
      body: JSON.stringify({
        name: 'Transação 1',
        users: [loggedUser.id],
      }),
    });

    const body = (await response.json()) as {
      id: string;
      name: string;
    };

    expect(response.status).toBe(201);

    expect(body).toEqual({
      id: body.id,
      name: 'Transação 1',
    });
  });
});

describe('', () => {
  it('should list family', async () => {
    const response = await fetch(
      `${process.env.BASE_URL}/api/family/${loggedUser.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loggedUser.token}`,
        },
      },
    );

    const body = (await response.json()) as { results: object[] };

    expect(response.status).toBe(200);

    expect(body.results.length).toBeGreaterThan(0);
  });

  it('should not list no family', async () => {
    const response = await fetch(`${process.env.BASE_URL}/api/family/${'1'}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loggedUser.token}`,
      },
    });

    const body = await response.json();

    expect(response.status).toBe(404);

    expect(body).toEqual({
      name: 'NotFoundError',
      message: 'Nenhuma familia encontrada.',
      statusCode: 404,
    });
  });
});
