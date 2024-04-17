/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-restricted-imports */
import { env } from '../../env';
import { sign } from 'jsonwebtoken';

export const removeBearer = (accessToken: string): string | null => {
  const [Bearer, hash] = accessToken.split(' ');

  if (Bearer === 'Bearer') return hash;

  return null;
};

export const incrementBearer = (token: string): string => `Bearer ${token}`;

interface generateTokenOutput {
  accessToken: string;
}

export const generateToken = ({
  avatar,
  id,
  roles,
  username,
  globalName,
  nick
}: any): generateTokenOutput => {
  const { JWT_SECRET: jwtSecret, JWT_EXPIRES_IN: expiresIn } = env.API;

  const data = {
    accessToken: sign(
      {
        user: { avatar, globalName, id, nick, roles, username }
      },
      jwtSecret,
      {
        expiresIn
      }
    )
  };

  return data;
};
