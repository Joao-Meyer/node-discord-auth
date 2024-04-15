import { DataSource } from '@infra/database';
import { ValidationError } from 'yup';
import { authenticateSchema } from '@data/validation';
import {
  badRequest,
  errorLogger,
  generateToken,
  messageErrorResponse,
  ok,
  validationErrorResponse
} from '@main/utils';
import { compare } from 'bcrypt';
import { messages } from '@domain/helpers';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';
import { env } from '@main/config';

interface Body {
  login: string;
  password: string;
  code: string;
}

interface ApiProps {
  route: string;
  queryParams?: unknown;
  body?: unknown;
  id?: number | string;
  method?: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
}

export const authenticateUserController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await authenticateSchema.validate(request, { abortEarly: false });

      // code is essentially the discord code
      const { login, password, code } = request.body as Body;

      // $payload = [
      //   'code'=>$discord_code,
      //   'client_id'=>'YOUR_CLIENT_ID',
      //   'client_secret'=>'YOUR_SECRET',
      //   'grant_type'=>'authorization_code',
      //   'redirect_uri'=>'http://localhost:5000/src/process-oauth.php', // or your redirect link
      //   'scope'=>'identify%20guids',
      // ];

      const { accessToken } = generateToken({
        id: user.id,
        login: user.login
      });

      // https://discordapp.com/api/oauth2
      const discordTokenResponse = await fetch(`${env.DC.API_URL}/oauth2/token`, {
        body: JSON.stringify({
          client_id: env.DC.CLIENT_ID,
          code
        }),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      });

      return ok({
        payload: {
          accessToken
        },
        response
      });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return messageErrorResponse({ error, response });
    }
  };
