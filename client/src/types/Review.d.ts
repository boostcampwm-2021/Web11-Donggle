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
  hashtags?: string[];
}

interface IReviewContent {
  text: string;
  address?: string;
  oauth_email: string;
  dateDiff: number;
  createdAt: Date;
  categories: ICategories;
}

export { ICategories, IReviewContent, IReviewSubmit };
