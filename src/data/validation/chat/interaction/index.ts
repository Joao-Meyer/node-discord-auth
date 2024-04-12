import { ChatRoles } from '@domain/models/enums';
import {
  arrayRequired,
  enumTypeRequired,
  numberRequired,
  stringNotRequired,
  stringRequired
} from '@main/utils';
import { yup } from '@infra/yup';

export const chatAiInteractionSchema = yup.object().shape({
  body: yup.object().shape({
    aiConfigId: numberRequired({
      english: 'ai config id',
      portuguese: 'id da configuração da ia'
    }),
    context: stringNotRequired(),
    questions: arrayRequired(
      yup.object().shape({
        content: stringRequired({
          english: 'content',
          portuguese: 'conteúdo'
        }),
        role: enumTypeRequired({
          data: ChatRoles,
          english: 'role',
          portuguese: 'cargo'
        })
      }),
      {
        english: 'questions',
        portuguese: 'questões'
      }
    )
  })
});
