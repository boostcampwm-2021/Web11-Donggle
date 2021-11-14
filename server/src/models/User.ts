import { Schema, model } from 'mongoose';

type CoordType = [number, number];

interface User {
  oauth_email: string;
  address: string;
  code: string;
  center: CoordType;
  image?: string;
}

const userSchema = new Schema<User>({
  oauth_email: { type: String, index: true },
  address: { type: String },
  code: { type: String },
  center: { type: [Number, Number] },
  image: { type: String },
});

const UserModel = model<User>('User', userSchema);

export { User, UserModel };
