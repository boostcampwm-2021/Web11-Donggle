import { Schema, model } from 'mongoose';

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
  oauth_email: string;
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
  oauth_email: { type: String, required: true, index: true },
  createdAt: { type: Date, required: true, default: new Date() },
});

const ReviewModel = model<Review>('Review', reviewSchema);

export { Review, ReviewModel };
