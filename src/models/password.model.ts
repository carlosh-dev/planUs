import bcrypt from 'bcryptjs';
import crypto from 'crypto';

async function hashPassword(password: string) {
  const rounds = await getNumberOfRounds();
  password = pepperPassword(password);
  return await bcrypt.hash(password, rounds);
}

async function getNumberOfRounds() {
  return process.env.NODE_ENV === 'production' ? 12 : 1;
}

function pepperPassword(password: string) {
  const pepper = process.env.PEPPER || '';
  if (!pepper) return password;

  const pepperedPassword = crypto
    .createHmac('sha256', pepper)
    .update(password)
    .digest('base64');
  return pepperedPassword;
}

const password = {
  hashPassword,
};

export default password;
