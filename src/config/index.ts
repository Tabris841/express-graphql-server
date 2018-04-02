import { merge } from 'lodash';

const env = process.env.NODE_ENV;

const baseConfig = {
  port: 3000,
  expireTime: '30d',
  secrets: {
    JWT_SECRET: 'yeezy350boost'
  },
  db: {
    url: 'mongodb://localhost/graphql'
  }
};

let envConfig = {};

switch (env) {
  case 'development':
  case 'dev':
    envConfig = require('./dev').config;
    break;
  case 'test':
  case 'testing':
    envConfig = require('./testing').config;
    break;
  case 'prod':
  case 'production':
    envConfig = require('./prod').config;
    break;
  default:
    envConfig = require('./dev').config;
}

export default merge(baseConfig, envConfig);
