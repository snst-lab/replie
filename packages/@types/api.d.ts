export {};
declare module "*.json" {
  const data: any;
  export default data;
}

declare global {
  namespace Api {
    export type Response = {
      response?: string | number | boolean | Record<string, any>;
      jwt?: {
        update: boolean;
        accessToken: string;
      };
    };
  }
}
