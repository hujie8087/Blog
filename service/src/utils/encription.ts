import * as crypto from 'crypto';

export function addSalt() {
  return crypto.randomBytes(3).toString('base64');
}

export function encript(userPassword: string, salt: string): string {
  return crypto
    .pbkdf2Sync(userPassword, salt, 10000, 16, 'sha256') //加密参数(需要加密的值，加盐，迭代次数，保留位数，加密方式)
    .toString('base64');
}
