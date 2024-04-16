/* eslint-disable max-statements */
import { ValidationError } from 'yup';
import { authenticateSchema } from '@data/validation';
import DiscordOAuth2 from 'discord-oauth2';
import { env } from '@main/config';
import {
  errorLogger,
  generateToken,
  messageErrorResponse,
  ok,
  validationErrorResponse
} from '@main/utils';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

const getRolesFromRoleIds = (roleIds: string[]): string[] =>
  roleIds
    ?.map((roleId) => {
      if (roleId === env.DC.SERVER_ROLES.ADMIN) return 'admin';
      if (roleId === env.DC.SERVER_ROLES.PAYER_STUDENT) return 'payer_student';

      return '';
    })
    ?.filter((role) => role !== '');

export const authenticateUserController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      const dcOAuth2 = new DiscordOAuth2();

      const { code } = request.query;

      console.log(code);

      const resAAA = await dcOAuth2.tokenRequest({
        clientId: env.DC.CLIENT_ID,
        clientSecret: env.DC.CLIENT_SECRET,
        redirectUri: env.DC.REDIRECT_URI,
        code,
        grantType: env.DC.GRANT_TYPE,
        scope: env.DC.SCOPE
      });

      console.log({
        code,
        grantType: env.DC.GRANT_TYPE,
        scope: env.DC.SCOPE
      });

      console.log(resAAA);

      // const dcAuthResponse = await fetch(`${env.DC.TOKEN_AUTH_URL}`, {
      //   body: JSON.stringify({
      //     code,
      //     grant_type: env.DC.GRANT_TYPE,
      //     redirect_uri: env.DC.REDIRECT_URI
      //   }),
      //   headers: {
      //     Authorization: `Basic ${Buffer.from(
      //       `${env.DC.CLIENT_ID}:${env.DC.CLIENT_SECRET}`
      //     ).toString('base64')}`,
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   },
      //   method: 'POST'
      // });

      // // console.log(env.DC.TOKEN_AUTH_URL);

      // const bbbb = await dcAuthResponse.json();

      // console.log('bbbb: ', bbbb);

      // const { access_token: authToken } = (await dcAuthResponse.json()) as { access_token: string };

      // console.log('authToken: ', authToken);

      // const dcUserResponse = await fetch(`${env.DC.USERS_URL}`, {
      //   headers: {
      //     Authorization: `Bearer ${authToken}`,
      //     'content-type': 'application/json'
      //   },
      //   method: 'GET'
      // });

      // const aaaa = await dcUserResponse.json();

      // console.log('aaaa: ', aaaa);

      // const { id, avatar, username } = (await dcUserResponse.json()) as {
      //   avatar: string;
      //   id: string;
      //   username: string;
      // };

      // const dcServerGuildResponse = await fetch(`${env.DC.SERVER_URL}/${env.DC.SERVER_ID}/member`, {
      //   headers: {
      //     Authorization: `Bearer ${authToken}`,
      //     'content-type': 'application/json'
      //   },
      //   method: 'GET'
      // });

      // const { roles } = (await dcServerGuildResponse.json()) as {
      //   roles: string[];
      // };

      // console.log({
      //   avatar,
      //   id,
      //   roles,
      //   username
      // });

      // const rolesFromIds = getRolesFromRoleIds(roles);

      // const { accessToken } = generateToken({
      //   avatar,
      //   id,
      //   roles: rolesFromIds,
      //   username
      // });

      const accessToken = 123;

      return response.redirect(`http://10.107.130.129:5174/auth?token=${accessToken}`);
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return messageErrorResponse({ error, response });
    }
  };
