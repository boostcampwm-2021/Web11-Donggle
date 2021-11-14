import { Schema, model } from 'mongoose';

type CoordType = [number, number];

interface Review {
  address: string;
  code?: string; // 우선 optional 값으로 지정
  center?: CoordType; // 우선 optional 값으로 지정
  rate: {
    safety: number;
    traffic: number;
    food: number;
    entertainment: number;
  };
  text?: string;
  user?: string; // 우선 optional 값으로 지정
  createdAt?: Date; // 우선 optional 값으로 지정
}

const reviewSchema = new Schema<Review>({
  address: { type: String, required: true },
  code: { type: String }, // required 임시 제거
  center: { type: [Number, Number] }, // required 임시 제거
  rate: {
    safety: { type: Number, required: true },
    traffic: { type: Number, required: true },
    food: { type: Number, required: true },
    entertainment: { type: Number, required: true },
  },
  text: { type: String },
  user: { type: String }, // required 임시 제거
  createdAt: { type: Date, required: true, default: Date.now },
});

const ReviewModel = model<Review>('Review', reviewSchema);

export { Review, ReviewModel };
