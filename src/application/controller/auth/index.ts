/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable consistent-return */
import { env } from '../../../main/config/env';
import { generateToken } from '../../../main/utils';
import type { Controller } from '../../protocols';
import type { Request, Response } from 'express';

const getRolesFromRoleIds = (roleIds: string[]): string[] =>
  roleIds
    ?.map((roleId) => {
      if (roleId === env.DC.SERVER_ROLES.ADMIN) return 'admin';
      if (roleId === env.DC.SERVER_ROLES.PAYER_STUDENT) return 'payer_student';

      return '';
    })
    ?.filter((role) => role !== '');

const getAvatarUrl = ({ avatarId, userId }: { userId: string; avatarId: string }): string =>
  `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.png?size=1024`;

export const authenticateUserController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      const { code, error } = request.query;

      if (typeof error === 'string')
        return response.redirect(`${env.FRONT.URL}?error=login_failure`);
      if (typeof code !== 'string')
        return response.redirect(`${env.FRONT.URL}?error=login_failure`);

      const params = new URLSearchParams({
        client_id: env.DC.CLIENT_ID,
        client_secret: env.DC.CLIENT_SECRET,
        code,
        grant_type: env.DC.GRANT_TYPE,
        redirect_uri: env.DC.REDIRECT_URI,
        scope: env.DC.SCOPE
      });

      const dcAuthResponse = await fetch(env.DC.TOKEN_AUTH_URL, {
        body: params,
        headers: {
          'Accept-Encoding': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST'
      });

      const authResponse = (await dcAuthResponse.json()) as {
        access_token: string;
        token_type: 'Bearer';
        expires_in: number;
        refresh_token: string;
        scope: 'identify';
      };

      const dcServerGuildResponse = await fetch(`${env.DC.SERVER_URL}/${env.DC.SERVER_ID}/member`, {
        headers: {
          Authorization: `${authResponse.token_type} ${authResponse.access_token}`
        },
        method: 'GET'
      });

      const serverGuildResponse = (await dcServerGuildResponse.json()) as {
        nick: string | null;
        roles: string[];
        user: {
          id: string;
          username: string;
          avatar: string;
          global_name: string;
        };
      };

      const { accessToken } = generateToken({
        avatar: getAvatarUrl({
          avatarId: serverGuildResponse.user.avatar,
          userId: serverGuildResponse.user.id
        }),
        globalName: serverGuildResponse.user.global_name,
        id: serverGuildResponse.user.id,
        nick: serverGuildResponse.nick,
        roles: getRolesFromRoleIds(serverGuildResponse.roles),
        username: serverGuildResponse.user.username
      });

      return response.redirect(`${env.FRONT.URL}/auth/${accessToken}`);
    } catch {
      return response.redirect(`${env.FRONT.URL}`);
    }
  };
