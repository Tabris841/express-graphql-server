import * as express from 'express';
import { graphiqlExpress } from 'apollo-server-express';

import setupMiddleware from './middleware';
import { graphQLRouter } from './api';
import { connect } from './db';

const app = express();

setupMiddleware(app);
connect();

app.use('/graphql', graphQLRouter);
app.use('/docs', graphiqlExpress({ endpointURL: '/graphql' }));

export default app;
