export type userFields = 'createdAt' | 'id' | 'login' | 'updatedAt';

export type userQueryFields = 'endDate' | 'login' | 'startDate';

export const userListQueryFields: userQueryFields[] = ['login', 'startDate', 'endDate'];
