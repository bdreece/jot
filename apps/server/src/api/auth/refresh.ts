import type { Handler } from 'types/handler';
import { createAccessToken, decodeToken } from '../../utils/token';

export type RefreshResponse = {
  accessToken: string;
};

const refresh: Handler<RefreshResponse> = async (req, res) => {
  try {
    const refreshToken = req.cookies['JotRefreshToken'];
    const { sub: id } = await decodeToken(refreshToken);
    const accessToken = await createAccessToken(id);
    return res.status(200).json({
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
  get: refresh,
};
