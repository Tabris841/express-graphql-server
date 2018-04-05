import { Student } from './student.model';

const getStudent = (_, { id }) =>
  Student.findById(id)
    .populate('courses')
    .exec();

const allStudents = () =>
  Student.find({})
    .populate('courses')
    .exec();

const createStudent = (_, { firstName, lastName, active, coursesIds }) => {
  let input = { firstName, lastName, active, courses: coursesIds };
  const student = new Student(input);
  student.save();
  return Student.populate(student, { path: 'courses' });
};

const updateStudent = (_, input) => {
  const { id, ...update } = input;

  return Student.findByIdAndUpdate(id, update, { new: true })
    .populate('courses')
    .exec();
};

const deleteStudent = (_, { id }) =>
  Student.findByIdAndRemove({ _id: id })
    .populate('courses')
    .exec();

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
