import { Course } from './course.model';

const getCourse = async (_, { id }) => {
  return await Course.findById(id).exec();
};

const allCourses = async (root, args, context, info) => {
  return await Course.find({}).exec();
};

const createCourse = async (_, { input }) => await Course.create(input);

const updateCourse = async (_, { input }) => {
  const { id, ...update } = input;

  return await Course.findByIdAndUpdate(id, update, { new: true }).exec();
};

const deleteCourse = async (_, { id }) =>
  await Course.findByIdAndRemove({ _id: id }).exec();

export const courseResolvers = {
  Query: {
    allCourses,
    Course: getCourse
  },
  Mutation: {
    createCourse,
    updateCourse,
    deleteCourse
  }
};
