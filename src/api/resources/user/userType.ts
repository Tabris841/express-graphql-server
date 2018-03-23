import { GraphQLObjectType, GraphQLID } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: {
      type: GraphQLID
    }
    // email: String!; @unique
    // password: String!;
    // name: String!;
  }
});
