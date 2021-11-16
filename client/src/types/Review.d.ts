interface ICategories {
  safety: number;
  traffic: number;
  food: number;
  entertainment: number;
}

interface IReviewRate {
  text: string;
  user: string;
  categories: ICategories;
}

interface IReviewSubmit {
  address: string;
  code: string;
  center: [number, number];
  text: string;
  user: string;
  categories: ICategories;
}

export { ICategories, IReviewRate, IReviewSubmit };
