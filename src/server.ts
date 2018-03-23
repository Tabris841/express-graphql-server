import * as express from 'express';
import * as cors from 'cors';
import { graphiqlExpress } from 'apollo-server-express';

import setupMiddleware from './middleware';
import { graphQLRouter } from './api';
import { connect } from './db';

const app = express();

setupMiddleware(app);
connect();

app.use('/graphql', cors(), graphQLRouter);
app.use('/docs', graphiqlExpress({ endpointURL: '/graphql' }));

export default app;
