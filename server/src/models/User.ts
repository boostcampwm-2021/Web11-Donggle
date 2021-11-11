import { Schema, model } from 'mongoose';

type CoordType = [number, number];

interface User {
  oauthEmail: string;
  address: string;
  code: string;
  center: CoordType;
  image?: string;
}

const userSchema = new Schema<User>({
  oauthEmail: { type: String, index: true },
  address: { type: String },
  code: { type: String },
  center: { type: [Number, Number] },
  image: { type: String },
});

const UserModel = model<User>('User', userSchema);

export { User, UserModel };
