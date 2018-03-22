import * as path from 'path';
import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress } from 'apollo-server-express';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

import { courseResolvers } from './resources/course';
import { studentResolvers } from './resources/student';

const typesArray = fileLoader(path.join(__dirname, 'resources/**/*.graphql'));

const schema = makeExecutableSchema({
  typeDefs: mergeTypes(typesArray, { all: true }),
  resolvers: merge({}, courseResolvers, studentResolvers)
});

export const graphQLRouter = graphqlExpress(req => ({
  schema,
  context: {
    req
  }
}));
