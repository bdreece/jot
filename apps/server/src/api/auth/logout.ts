import type { Handler } from 'types/handler';

const logout: Handler<undefined> = async (_, res) =>
  res
    .setHeader(
      'Set-Cookie',
      'JotRefreshToken=undefined; Max-Age=0; Path=/; SameSite=None; HttpOnly;',
    )
    .status(200)
    .send();

export default {
  get: logout,
};
