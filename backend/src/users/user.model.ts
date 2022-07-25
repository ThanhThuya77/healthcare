import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

export interface IUser extends mongoose.Document {
  id: string;
  fullName: string;
  userName: string;
  password: string;
  isAdmin: boolean;
}
