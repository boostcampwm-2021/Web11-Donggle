import { Request } from 'express';
export interface CategoryRateType {
  categories: {
    safety: number;
    traffic: number;
    food: number;
    entertainment: number;
  };
}
export interface ReviewRequest extends Request {
  body: {
    password: string;
    type: string;
  };
}

export interface ReviewInsertRequest extends Request {
  body: {
    address: string;
    code: string;
    center: [number, number];
    text: string;
    user: string;
    categories: CategoryRateType;
  };
}
