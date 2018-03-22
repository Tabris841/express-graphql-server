import * as mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  active: { type: Boolean, required: true },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'course',
      required: true
    }
  ]
});

export const Student = mongoose.model('student', studentSchema);
