import { ICategories } from './Review';

interface IRankRate {
  address: string;
  count: number;
  categories: ICategories;
}

interface IRankItem {
  label: string;
  address: string;
  categories: ICategories;
  rank?: number;
}

export { IRankRate, IRankItem };
