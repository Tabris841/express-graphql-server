import { Student } from './student.model';

const getStudent = (_, { id }) => Student.findById(id).exec();

const allStudents = () => Student.find({});

const createStudent = (_, { input }) => Student.create(input).exec();

const updateStudent = (_, { input }) => {
  const { id, ...update } = input;

  return Student.findByIdAndUpdate(id, update, { new: true }).exec();
};

const deleteStudent = (_, { id }) => Student.findByIdAndRemove({ _id: id });

export const studentResolvers = {
  Query: {
    allStudents,
    Student: getStudent
  },
  Mutation: {
    createStudent,
    updateStudent,
    deleteStudent
  }
};
