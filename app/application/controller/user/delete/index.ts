/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { DataSource } from 'infra/database';
import { badRequest, errorLogger, ok } from 'main/utils';
import { messages } from 'domain/helpers';
import type { Controller } from 'application/protocols';
import type { Request, Response } from 'express';

export const deleteUserController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await DataSource.user.delete({
        select: {
          id: true
        },
        where: {
          id: request.params.id
        }
      });

      return ok({ response });
    } catch (error) {
      errorLogger(error);
      return badRequest({ message: messages.auth.notFound, response });
    }
  };
