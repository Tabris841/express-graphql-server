import { Student } from './student.model';

const getStudent = async (_, { id }) =>
  await Student.findById(id)
    .populate('courses')
    .exec();

const allStudents = async () =>
  await Student.find({})
    .populate('courses')
    .exec();

const createStudent = async (
  _,
  { firstName, lastName, active, coursesIds }
) => {
  let input = { firstName, lastName, active, courses: coursesIds };
  const student = new Student(input);
  student.save();
  return await Student.populate(student, { path: 'courses' });
};

const updateStudent = async (_, input) => {
  const { id, ...update } = input;

  return await Student.findByIdAndUpdate(id, update, { new: true })
    .populate('courses')
    .exec();
};

const deleteStudent = async (_, { id }) =>
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
