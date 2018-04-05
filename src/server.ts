import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as mongoose from 'mongoose';
import { graphiqlExpress } from 'apollo-server-express';
import * as session from 'express-session';
import * as uuid from 'uuid';
import * as passport from 'passport';
import * as expressJwt from 'express-jwt';

import { graphQLRouter } from './api';
import UserRouter from './api/resources/user/user.controller';
import appConfig from './config';

require('./api/modules/passport');

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.connectToDb();
  }

  private middleware(): void {
    this.express.use(cors());
    this.express.use(logger('dev'));
    this.express.use(
      session({
        genid: req => uuid.v4(),
        secret: 'Z3]GJW!?9uP”/Kpe'
      })
    );
    this.express.use(passport.initialize());
    this.express.use(passport.session());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
  }

  private routes(): void {
    this.express.use('/user', new UserRouter().router);
    this.express.use(
      '/graphql',
      expressJwt({
        secret: appConfig.secrets.JWT_SECRET,
        credentialsRequired: false
      }),
      graphQLRouter
    );
    this.express.use('/docs', graphiqlExpress({ endpointURL: '/graphql' }));
  }

  private connectToDb(config = appConfig): Promise<typeof mongoose> {
    return mongoose.connect(config.db.url);
  }
}

export default new App().express;
