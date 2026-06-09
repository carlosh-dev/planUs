import orchestrator from '../../../../orchestrator.js';

describe('POST /family', () => {
  let loggedUser: {
    id: string;
    name: string;
    token: string;
  };

  beforeAll(async () => {
    loggedUser = await orchestrator.getToken();
  });
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
