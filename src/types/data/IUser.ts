import { Types, Document } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  token: string | null;
}

export default IUser;
