import merge from 'lodash.merge';
import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress } from 'apollo-server-express';

import { courseType, courseResolvers } from './resources/course';
import { studentType, studentResolvers } from './resources/student';

const schema = makeExecutableSchema({
  typeDefs: [courseType, studentType],
  resolvers: merge({}, courseResolvers, studentResolvers)
});

export const graphQLRouter = graphqlExpress(req => ({
  schema,
  context: {
    req
  }
}));
