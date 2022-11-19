/*
 * jot - a simple note-taking app
 * Copyright (C) 2022 Brian Reece

 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.

 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
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
