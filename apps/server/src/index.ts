import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';

import { ping } from './api';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(compression());
app.use(morgan('dev'));

app.get('/api/ping', ping.get);

app.listen(PORT, () => console.log(`Listening on :${PORT}`));
