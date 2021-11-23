import { Request } from 'express';
export interface CategoryRateType {
  safety: number;
  traffic: number;
  food: number;
  entertainment: number;
}

export interface ReviewInsertData {
  address: string;
  text: string;
  user: string;
  categories: CategoryRateType;
  hashtags?: string[];
}

export interface ReviewFindData {
  _id: string;
  dateDiff: number;
  text: string;
  user: string;
  categories: CategoryRateType;
}

export interface ReviewGetUserRequest extends Request {
  id: string;
}

export interface ReviewInsertRequest extends Request {
  body: ReviewInsertData;
}
