export type aiConfigFields =
  | 'aiModelId'
  | 'createdAt'
  | 'defaultPrompt'
  | 'frequencyPenalty'
  | 'id'
  | 'maxRetries'
  | 'nickname'
  | 'presencePenalty'
  | 'previewMessageIncluded'
  | 'stopSequence'
  | 'temperature'
  | 'topP'
  | 'updatedAt';

export type aiConfigQueryFields =
  | 'aiModelId'
  | 'defaultPrompt'
  | 'endDate'
  | 'frequencyPenalty'
  | 'maxRetries'
  | 'nickname'
  | 'presencePenalty'
  | 'previewMessageIncluded'
  | 'startDate'
  | 'stopSequence'
  | 'temperature'
  | 'topP';

export const aiConfigListQueryFields: aiConfigQueryFields[] = [
  'defaultPrompt',
  'aiModelId',
  'endDate',
  'frequencyPenalty',
  'maxRetries',
  'presencePenalty',
  'nickname',
  'previewMessageIncluded',
  'startDate',
  'stopSequence',
  'temperature',
  'topP'
];
