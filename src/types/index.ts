export * from './account';
export * from './httpError';

export type Mapper<T> = (row: any) => T;