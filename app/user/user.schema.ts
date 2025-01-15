import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  isActive: boolean;
  refreshToken: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Ensure 'required: true' is present
  isActive: { type: Boolean, default: false },
  refreshToken: { type: String, default: '' },
});

export default mongoose.model<IUser>('User', UserSchema);
