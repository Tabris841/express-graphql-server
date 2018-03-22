import * as mongoose from 'mongoose';

import appConfig from './config';

export const connect = (config = appConfig) => {
  return mongoose.connect(config.db.url);
};
