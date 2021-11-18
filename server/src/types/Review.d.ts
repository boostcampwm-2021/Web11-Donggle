import { Request } from 'express';
export interface CategoryRateType {
  categories: {
    safety: number;
    traffic: number;
    food: number;
    entertainment: number;
  };
}

export interface ReviewInsertData {
  address: string;
  text: string;
  user: string;
  categories: CategoryRateType;
}

export interface ReviewFindData {
  _id: string;
  dateDiff: number;
  text: string;
  user: string;
  categories: CategoryRateType;
}

export interface ReviewRequest extends Request {
  body: {
    password: string;
    type: string;
  };
}

export interface ReviewInsertRequest extends Request {
  body: ReviewInsertData;
}
