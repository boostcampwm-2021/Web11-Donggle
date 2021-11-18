import { Schema, model, PopulatedDoc } from 'mongoose';
import { User } from '@models/User';

type CoordType = [number, number];

interface Review {
  address: string;
  code: string;
  center: CoordType;
  categories: {
    safety: number;
    traffic: number;
    food: number;
    entertainment: number;
  };
  text?: string;
  user: string; // 회원가입 로직 구현 후 변경 PopulatedDoc<User>;
  createdAt: Date;
}

const reviewSchema = new Schema<Review>({
  address: { type: String, required: true },
  code: { type: String, required: true },
  center: { type: [Number, Number], required: true },
  categories: {
    safety: { type: Number, required: true },
    traffic: { type: Number, required: true },
    food: { type: Number, required: true },
    entertainment: { type: Number, required: true },
  },
  text: { type: String },
  // Schema.Types.ObjectId,
  user: { type: String, required: true, ref: 'User' },
  createdAt: { type: Date, required: true, default: new Date() },
});

const ReviewModel = model<Review>('Review', reviewSchema);

export { Review, ReviewModel };
