interface ICategories {
  safety: number;
  traffic: number;
  food: number;
  entertainment: number;
}

interface IReviewSubmit {
  address: string;
  text: string;
  user: string;
  categories: ICategories;
}

interface IReviewContent {
  text: string;
  user: string;
  dateDiff: number;
  createdAt: Date;
  categories: ICategories;
}

export { ICategories, IReviewContent, IReviewSubmit };
