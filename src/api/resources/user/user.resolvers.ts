import { User } from './user.model';

const getUser = async (_, { id }) => await User.findById(id).exec();

const allUsers = async () => await User.find({}).exec();

const createUser = async (_, { input }) => await User.create(input);

const updateUser = async (_, { input }) => {
  const { id, ...update } = input;

  return await User.findByIdAndUpdate(id, update, { new: true }).exec();
};

const deleteUser = async (_, { id }) =>
  await User.findByIdAndRemove({ _id: id });

export const userResolvers = {
  Query: {
    allUsers,
    Student: getUser
  },
  Mutation: {
    createUser,
    updateUser,
    deleteUser
  }
};
