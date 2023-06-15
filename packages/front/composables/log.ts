export const log = console.log;
export const info = (message?: any, ...optionalParams: any[]) =>
  console.info("[info]", message, ...optionalParams);
export const warn = (message?: any, ...optionalParams: any[]) =>
  console.info("[warn]", message, ...optionalParams);
