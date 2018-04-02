import * as express from 'express';
import * as cors from 'cors';
import { graphiqlExpress } from 'apollo-server-express';

import setupMiddleware from './middleware';
import { graphQLRouter } from './api';
import { connect } from './db';
import { signin, verifyUser } from './api/modules/auth';

const app = express();

setupMiddleware(app);
connect();

app.use('/signin', signin);
app.use('/login', verifyUser);
app.use('/graphql', cors(), graphQLRouter);
app.use('/docs', graphiqlExpress({ endpointURL: '/graphql' }));

export default app;
