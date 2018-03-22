import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  level: { type: String, required: false }
});

export const Course = mongoose.model('course', courseSchema);
