import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true
    },
    token: {
      type: String,
      default: null
    },
    verify: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required']
    }
  },
  { versionKey: false, timestamps: true }
);

export const User = model('user', userSchema);

export default User;
