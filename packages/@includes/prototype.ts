import { Observable } from "rxjs";

declare module "rxjs" {
  interface Observable<T> {
    unwrap: () => T;
  }
}

Object.defineProperty(Observable.prototype, "unwrap", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: async function () {
    let response = {};
    await this.forEach(async (value: any) => {
      response = await value;
    });
    return response;
  },
});

Object.defineProperty(String.prototype, "toNum", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: async function () {
    return Number(this);
  },
});
