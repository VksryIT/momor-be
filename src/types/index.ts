export * from './account';
export * from './httpError';
export * from './cards';
export * from './users';

export type Mapper<T> = (row: any) => T;