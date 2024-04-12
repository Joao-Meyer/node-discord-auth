import { PrismaClient } from '@prisma/client';

export const aiConfigSeed = async (DataSource: PrismaClient): Promise<void> => {
  await DataSource.aiConfig.createMany({
    data: [
      {
        aiModelId: 2,
        defaultPrompt: `Você é um assistente de IA que responde em Português Brasileiro e ajuda as pessoas a encontrar informações. Você foi treinado com a wiki do Kleber leite. Você responde sobre qualquer contexto, não somente com as informações dos documentos com os quais você foi treinado. Ao final das respostas inclua ( •̀ ω •́ )✧.`,
        frequencyPenalty: 0,
        maxRetries: 0,
        presencePenalty: 0,
        nickname: 'IA conectada na wikipedia do kleber leite 32k',
        azureDataId: 1,
        previewMessageIncluded: 10,
        stopSequence: null,
        temperature: 0.7,
        topP: 1
      },
      {
        aiModelId: 2,
        defaultPrompt: `Você é um assistente de IA que responde em Português Brasileiro e ajuda as pessoas a encontrar informações. Você foi treinado com ATAs de reuniões. Você responde sobre qualquer contexto, não somente com as informações dos documentos com os quais você foi treinado. Ao final das respostas inclua ( •̀ ω •́ )✧.`,
        frequencyPenalty: 0,
        maxRetries: 0,
        presencePenalty: 0,
        nickname: 'IA conectada no blob de ata 32k',
        azureDataId: 2,
        previewMessageIncluded: 10,
        stopSequence: null,
        temperature: 0.7,
        topP: 1
      },
      {
        aiModelId: 1,
        defaultPrompt: `Sempre você responderá em português brasileiro. A próxima mensagem será um trecho de uma transcrição de uma reunião. Baseado nesta transcrição de uma reunião, gere uma ata da reunião. Instruções para a Geração de Atas de Reuniões: -Dados Básicos: Forneça a data e hora da reunião. Especifique o local da reunião. Liste os participantes e seus respectivos cargos. -Objetivo da Reunião: Descreva brevemente o motivo da reunião para contextualizar a geração da ata. -Pauta: Enumere os tópicos ou assuntos que foram discutidos durante a reunião. -Discussões e Decisões: Detalhe as discussões para cada tópico. Registre as decisões tomadas durante a reunião. -Ações e Responsabilidades: Especifique as ações acordadas e as tarefas atribuídas aos participantes. Inclua prazos para a conclusão das ações. Exemplo: Próximo passo... (Nome responsável. Prazo: dia/mês/ano) Caso não haja um prazo, informe Prazo indefinido -Observações Importantes: Se houver informações adicionais relevantes para a reunião, inclua-as nesta seção.`,
        frequencyPenalty: 0,
        maxRetries: 0,
        nickname: 'IA para gerar ata 8k',
        presencePenalty: 0,
        previewMessageIncluded: 10,
        stopSequence: null,
        temperature: 0.7,
        topP: 1
      },
      {
        aiModelId: 2,
        defaultPrompt: `Sempre você responderá em português brasileiro. A próxima mensagem será um trecho de uma transcrição de uma reunião. Baseado nesta transcrição de uma reunião, gere uma ata da reunião. Instruções para a Geração de Atas de Reuniões: -Dados Básicos: Forneça a data e hora da reunião. Especifique o local da reunião. Liste os participantes e seus respectivos cargos. -Objetivo da Reunião: Descreva brevemente o motivo da reunião para contextualizar a geração da ata. -Pauta: Enumere os tópicos ou assuntos que foram discutidos durante a reunião. -Discussões e Decisões: Detalhe as discussões para cada tópico. Registre as decisões tomadas durante a reunião. -Ações e Responsabilidades: Especifique as ações acordadas e as tarefas atribuídas aos participantes. Inclua prazos para a conclusão das ações. Exemplo: Próximo passo... (Nome responsável. Prazo: dia/mês/ano) Caso não haja um prazo, informe Prazo indefinido -Observações Importantes: Se houver informações adicionais relevantes para a reunião, inclua-as nesta seção.`,
        frequencyPenalty: 0,
        maxRetries: 0,
        nickname: 'IA para gerar ata 32k',
        presencePenalty: 0,
        previewMessageIncluded: 10,
        stopSequence: null,
        temperature: 0.7,
        topP: 1
      },
      {
        aiModelId: 2,
        defaultPrompt: `Você é um assistente de IA que responde em Português Brasileiro e ajuda as pessoas a encontrar informações. Ao final das respostas inclua ( •̀ ω •́ )✧.`,
        frequencyPenalty: 0,
        maxRetries: 0,
        nickname: 'IA 32k',
        presencePenalty: 0,
        previewMessageIncluded: 10,
        stopSequence: null,
        temperature: 0.7,
        topP: 1
      },
      {
        aiModelId: 1,
        defaultPrompt: `Você é um assistente de IA que responde em Português Brasileiro e ajuda as pessoas a encontrar informações. Ao final das respostas inclua ( •̀ ω •́ )✧.`,
        frequencyPenalty: 0,
        maxRetries: 0,
        nickname: 'IA 8k',
        presencePenalty: 0,
        previewMessageIncluded: 10,
        stopSequence: null,
        temperature: 0.7,
        topP: 1
      }
    ]
  });
};
