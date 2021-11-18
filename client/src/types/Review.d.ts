interface ICategories {
  safety: number;
  traffic: number;
  food: number;
  entertainment: number;
}

interface IReviewSubmit {
  address: string;
  text: string;
  oauth_email: string;
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
