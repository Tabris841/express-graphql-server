import { Course } from './course.model';

const getCourse = (_, { id }) => Course.findById(id).exec();

const allCourses = () => Course.find({}).exec();

const createCourse = (_, { input }) => Course.create(input);

const updateCourse = (_, { input }) => {
  const { id, ...update } = input;

  return Course.findByIdAndUpdate(id, update, { new: true }).exec();
};

const deleteCourse = (_, { id }) =>
  Course.findByIdAndRemove({ _id: id }).exec();

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
