import { Schema, model } from 'mongoose';

type CoordType = [number, number];

interface User {
  oauth_email: string;
  address: string;
  code: string;
  center: CoordType;
  image?: string;
  refreshToken?: string;
}

const userSchema = new Schema<User>({
  oauth_email: { type: String, index: true },
  address: { type: String, required: true },
  code: { type: String },
  center: { type: [Number, Number] },
  image: { type: String },
  refreshToken: { type: String, required: true },
});

const UserModel = model<User>('User', userSchema);

export { User, UserModel };
