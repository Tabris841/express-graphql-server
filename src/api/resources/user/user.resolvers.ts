import { User } from './user.model';

const getUser = (_, { id }) => User.findById(id).exec();

const allUsers = () => User.find({});

const createUser = (_, { input }) => User.create(input);

const updateUser = (_, { input }) => {
  const { id, ...update } = input;

  return User.findByIdAndUpdate(id, update, { new: true }).exec();
};

const deleteUser = (_, { id }) => User.findByIdAndRemove({ _id: id });

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
