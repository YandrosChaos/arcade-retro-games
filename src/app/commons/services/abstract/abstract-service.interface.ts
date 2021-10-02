export interface AbstractService<T> {
  getAll(): T[];
  getOne(key: string): T;
  create(item: T): void;
  update(item: T): void;
  delete(key: string): void;
  holyGrenade(): void;
}
