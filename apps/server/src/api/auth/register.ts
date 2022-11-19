import type { Handler } from 'types/handler';

import z from 'zod';
import db from '../../utils/db';
import { hashPassword } from '../../utils/password';

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().min(10).max(13),
  password: z.string().min(8),
});

const register: Handler<undefined> = async (req, res) => {
  try {
    const { firstName, lastName, phone, password } = await schema.parseAsync(
      req.body,
    );

    const userExists =
      (await db.user.findUnique({
        where: {
          phone,
        },
        select: {
          id: true,
        },
      })) !== null;

    if (userExists) throw 'User exists!';

    const { hash, salt } = await hashPassword(password);

    await db.user.create({
      data: {
        firstName,
        lastName,
        phone,
        hash,
        salt,
      },
    });

    return res.status(200).json({
      success: true,
      data: undefined,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
};

export default {
  post: register,
};
