export {};
declare global {
  type Enumerable<T> = T | Array<T>;
  type Json = Record<string, any>;
}
