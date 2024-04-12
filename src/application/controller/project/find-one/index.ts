import { DataSource } from '@infra/database';
import { ProjectFields } from '@application/protocols/fields';
import { errorLogger, messageErrorResponse, notFound, ok } from '@main/utils';
import type { Controller } from '@application/protocols';
import type { Request, Response } from 'express';

export const findOneProjectController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      const project = await DataSource.project.findUnique({
        select: ProjectFields,
        where: {
          id: Number(request.params.id)
        }
      });

      if (project === null)
        return notFound({
          field: {
            english: 'Project',
            portuguese: 'Projeto'
          },
          response
        });

      return ok({
        payload: project,
        response
      });
    } catch (error) {
      errorLogger(error);

      return messageErrorResponse({ error, response });
    }
  };
