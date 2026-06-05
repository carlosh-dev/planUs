import passwordModel from '../models/password.model.js';

describe('passwordModel', () => {
  it('deve gerar um hash diferente da senha original', async () => {
    const hash = await passwordModel.hashPassword('minha-senha');
    expect(hash).not.toBe('minha-senha');
  });

  it('deve validar a senha correta contra o hash', async () => {
    const hash = await passwordModel.hashPassword('minha-senha');
    const ok = await passwordModel.comparePassword('minha-senha', hash);
    expect(ok).toBe(true);
  });

  it('deve rejeitar uma senha incorreta', async () => {
    const hash = await passwordModel.hashPassword('minha-senha');
    const ok = await passwordModel.comparePassword('senha-errada', hash);
    expect(ok).toBe(false);
  });
});
