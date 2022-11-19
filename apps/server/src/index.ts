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
import 'reflect-metadata';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';

import { buildTypeDefsAndResolvers } from 'type-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphqlHTTP } from 'express-graphql';
import {
  AssetCrudResolver,
  DirectoryCrudResolver,
  NoteCrudResolver,
} from '@jot/data/generated/type-graphql/index';

import * as api from './api';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(morgan('dev'));
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: '*' }));

buildTypeDefsAndResolvers({
  resolvers: [AssetCrudResolver, DirectoryCrudResolver, NoteCrudResolver],
}).then(({ typeDefs, resolvers }) => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  app.use(
    '/api/graphql',
    graphqlHTTP({
      schema,
    }),
  );
});

app.post('/api/auth/login', api.auth.login.post);
app.post('/api/auth/register', api.auth.register.post);
app.get('/api/auth/logout', api.auth.logout.get);
app.get('/api/auth/refresh', api.auth.refresh.get);

app.listen(PORT, () => console.log(`Listening on :${PORT}`));
