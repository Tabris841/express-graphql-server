import { combineResolvers } from 'graphql-resolvers';
import { User } from './user.model';

const getUser = (_, { id }) => User.findById(id).exec();

const allUsers = () => User.find({}).exec();

const createUser = (_, { input }) => User.create(input);

const updateUser = (_, { input }) => {
  const { id, ...update } = input;

  return User.findByIdAndUpdate(id, update, { new: true }).exec();
};

const deleteUser = async (_, { id }) =>
  await User.findByIdAndRemove({ _id: id });

const isAuthenticated = (root, args, context, info) => {
  if (!context.user) {
    return new Error('Not authenticated');
  }
};

export const userResolvers = {
  Query: {
    allUsers: combineResolvers(isAuthenticated, allUsers),
    Student: getUser
  },
  Mutation: {
    createUser,
    updateUser,
    deleteUser
  }
};
