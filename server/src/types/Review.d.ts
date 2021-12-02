import { Request } from 'express';
export interface CategoryRateType {
  safety: number;
  traffic: number;
  food: number;
  entertainment: number;
}

export interface ReviewInsertData {
  address: string;
  text?: string;
  oauth_email: string;
  categories: CategoryRateType;
  hashtags?: string[];
  createdAt?: Date;
}

export interface ReviewFindData extends ReviewInsertData {
  image: string;
}

export interface ReviewGetUserRequest extends Request {
  id?: string;
}

export interface ReviewInsertRequest extends Request {
  body: ReviewInsertData;
}
