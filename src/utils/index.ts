import * as dotenv from 'dotenv';
dotenv.config(); //在Injectable之外读取env文件变量
export const APP_ENV_DEV = process.env.APP_ENV_DEV;

export const APP_ENV_PROD = process.env.APP_ENV_PROD;

export enum resStatusCode {
  /**
   * @description 没有权限访问
   */
  noAuth = -1,
  /**
   * @description 失败
   */
  failed = 1,
  /**
   * @description 成功
   */
  success = 0,
  /**
   * @description 未登录
   */
  noLogin = 4,
  /**
   * @description 服务端错误
   */
  serverError = 5,
}

export const exclude = <T, Key extends keyof T>(
  data: T,
  keys: Key[],
): Omit<T, Key> => {
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => !keys.includes(key as any)),
  ) as Omit<T, Key>;
};

export const awaitWrap = <T = any>(promise: Promise<T>) => {
  return promise.then((res) => [null, res]).catch((err) => [err, null]);
};
