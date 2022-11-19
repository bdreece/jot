import type { Handler } from 'types/handler';

import z from 'zod';
import db from '../../utils/db';
import { verifyHash } from '../../utils/password';
import { createAccessToken, createRefreshToken } from '../../utils/token';

const schema = z.object({
  phone: z.string().min(10).max(13),
  password: z.string().min(8),
});

export type LoginResponse = {
  accessToken: string;
};

const login: Handler<LoginResponse> = async (req, res) => {
  try {
    const { phone, password } = await schema.parseAsync(req.body);

    const user = await db.user.findUnique({
      where: {
        phone,
      },
      select: {
        id: true,
        hash: true,
        salt: true,
      },
    });

    if (!user || !(await verifyHash(password, { ...user })))
      throw 'Bad credentials';

    const id = user.id.toString();
    const [accessToken, refreshToken] = await Promise.all([
      createAccessToken(id),
      createRefreshToken(id),
    ]);

    return res
      .setHeader(
        'Set-Cookie',
        `JotRefreshToken=${refreshToken}; Path=/; SameSite=None; HttpOnly`,
      )
      .status(200)
      .json({
        success: true,
        data: {
          accessToken,
        },
      });
  } catch (error: any) {
    return res.status(400).json({ success: false, error });
  }
};

export default {
  post: login,
};
