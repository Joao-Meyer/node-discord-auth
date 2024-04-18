import { env } from 'main/config/env';
import { errorLogger } from 'main/utils/error-logger';
import { removeBearer } from 'main/utils/jwt';
import { unauthorized } from 'main/utils/api-response';
import { verify } from 'jsonwebtoken';
import type { Controller } from 'application/protocols';
import type { NextFunction, Request, Response } from 'express';
import type { tokenInput } from 'domain/token';

export const validateTokenMiddleware: Controller =
  // eslint-disable-next-line consistent-return
  () => (request: Request, response: Response, next: NextFunction) => {
    try {
      const { authorization } = request.headers;

      if (typeof authorization === 'undefined') return unauthorized({ response });

      const accessToken = removeBearer(authorization);

      if (accessToken === null) return unauthorized({ response });

      const {
        API: { JWT_SECRET }
      } = env;
      const {
        user: { id, avatar, globalName, nick, roles, username }
      } = verify(accessToken, JWT_SECRET) as { user: tokenInput };

      if (
        typeof id === 'undefined' ||
        typeof avatar === 'undefined' ||
        typeof globalName === 'undefined' ||
        typeof nick === 'undefined' ||
        typeof username === 'undefined' ||
        typeof roles === 'undefined'
      )
        return unauthorized({ response });

      Object.assign(request, { user: { avatar, globalName, id, nick, roles, username } });
      next();
    } catch (error) {
      errorLogger(error);

      return unauthorized({ response });
    }
  };
