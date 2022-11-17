import type { Handler } from 'types/handler';

const get: Handler<string> = async (_, res) => {
  console.log('Ping!');
  res.json({
    success: true,
    data: 'Pong!',
  });
};

export default {
  get,
};
