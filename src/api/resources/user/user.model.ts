import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.methods = {
  authenticate(plaintTextPassword) {
    return bcrypt.compareSync(plaintTextPassword, this.password);
  },
  hashPassword(plaintTextPassword) {
    if (!plaintTextPassword) {
      throw new Error('Could not save user');
    }

    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plaintTextPassword, salt);
  }
};

export const User = mongoose.model('user', userSchema);
