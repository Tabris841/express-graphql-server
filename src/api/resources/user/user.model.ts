import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: String,
    required: true
  },
  email: {
    type: String,
    unique: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export const User = mongoose.model('user', userSchema);
