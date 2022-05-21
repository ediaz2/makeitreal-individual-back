export * from './auth';
export * from './users';
export * from './products';

export type PromiseService<T> = Promise<[T | null, Error | null]>;