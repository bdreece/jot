import crypto from 'crypto';

const DIGEST = 'sha-512';
const ENCODING = 'base64';
const ITERATIONS = 10000;
const KEY_LENGTH = 128;

export type PasswordHash = {
  hash: string;
  salt: string;
};

export const hashPassword = (password: string): Promise<PasswordHash> =>
  new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(KEY_LENGTH).toString(ENCODING);
    crypto.pbkdf2(
      password,
      salt,
      ITERATIONS,
      KEY_LENGTH,
      DIGEST,
      (err, hash) => {
        if (err) reject(err);
        else
          resolve({
            hash: hash.toString(ENCODING),
            salt,
          });
      },
    );
  });

export const verifyHash = (
  password: string,
  { hash, salt }: PasswordHash,
): Promise<boolean> =>
  new Promise((resolve, reject) =>
    crypto.pbkdf2(
      password,
      salt,
      ITERATIONS,
      KEY_LENGTH,
      DIGEST,
      (err, hashAttempt) => {
        if (err) reject(err);
        else resolve(hash === hashAttempt.toString(ENCODING));
      },
    ),
  );
