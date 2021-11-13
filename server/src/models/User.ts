import { Schema, model } from 'mongoose';

interface User {
  oauth_email: string;
  address: string;
  code: string;
  center: [number, number];
  image: string;
}

const userSchema = new Schema<User>({
  oauth_email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  code: { type: String, required: true },
  center: { type: [Number, Number], required: true },
  image: { type: String, required: true },
});

const UserModel = model<User>('User', userSchema);

export { User, UserModel };
