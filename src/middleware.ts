import * as bodyParser from 'body-parser';
import * as cors from 'cors';

const setGlobalMiddleware = app => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
};

export default setGlobalMiddleware;
