import { DataSource } from '@infra/database';
import { env2 } from '@main/config/env';
import { errorLogger, removeBearer, unauthorized } from '@main/utils';
import { verify } from 'jsonwebtoken';
import type { Controller } from '@application/protocols';
import type { NextFunction, Request, Response } from 'express';
import type { tokenInput } from '@domain/token';

export const validateTokenMiddleware: Controller =
  // eslint-disable-next-line consistent-return
  () => async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { authorization } = request.headers;

      if (typeof authorization === 'undefined') return unauthorized({ response });

      const accessToken = removeBearer(authorization);

      if (accessToken === null) return unauthorized({ response });

      const { jwtSecret } = env2;
      const {
        user: { id, login }
      } = verify(accessToken, jwtSecret) as { user: tokenInput };

      if (typeof id === 'undefined' || typeof login === 'undefined')
        return unauthorized({ response });

      const account = await DataSource.user.findFirst({
        where: {
          AND: {
            id,
            login
          }
        }
      });

      if (account === null) return unauthorized({ response });

      Object.assign(request, { user: { id, login } });
      next();
    } catch (error) {
      errorLogger(error);

      return unauthorized({ response });
    }
  };
