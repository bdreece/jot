import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET || 'mysecret';
const AUDIENCE = 'jot';
const ISSUER = 'jot';

export type Principal = {
  sub: string;
  aud?: string | string[];
  iss?: string;
  [key: string]: any;
};

const createToken = (
  principal: Principal,
  expiresIn: number,
): Promise<string> =>
  new Promise((resolve, reject) =>
    jwt.sign(
      { aud: AUDIENCE, iss: ISSUER, ...principal },
      SECRET,
      { expiresIn },
      (err, encoded) => {
        if (err) reject(err);
        else resolve(encoded!);
      },
    ),
  );

// 2 hours
export const createAccessToken = (id: string) =>
  createToken({ sub: id }, 60 * 60 * 2);

// 10 years
export const createRefreshToken = (id: string) =>
  createToken({ sub: id }, 60 * 60 * 24 * 7 * 52 * 10);

export const decodeToken = (token: string): Promise<Principal> =>
  new Promise((resolve, reject) =>
    jwt.verify(
      token,
      SECRET,
      { audience: AUDIENCE, issuer: ISSUER },
      (err, decoded) => {
        const payload = decoded as jwt.JwtPayload;
        if (err) reject(err);
        else
          resolve({
            sub: payload.sub!,
            ...payload,
          });
      },
    ),
  );
