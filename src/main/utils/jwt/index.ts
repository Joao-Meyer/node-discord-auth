import { env2 } from '@main/config/env';
import { sign } from 'jsonwebtoken';
import type { tokenInput } from '@domain/token';

export const removeBearer = (accessToken: string): string | null => {
  const [Bearer, hash] = accessToken.split(' ');

  if (Bearer === 'Bearer') return hash;

  return null;
};

export const incrementBearer = (token: string): string => `Bearer ${token}`;

interface generateTokenOutput {
  accessToken: string;
}

export const generateToken = ({ id, login }: tokenInput): generateTokenOutput => {
  const { jwtSecret, jwtExpiresIn } = env2;

  const data = {
    accessToken: sign({ user: { id, login } }, jwtSecret, { expiresIn: jwtExpiresIn })
  };

  return data;
};
