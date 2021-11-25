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
  createdAt: Date;
  categories: ICategories;
  image: string;
}

export { ICategories, IReviewContent, IReviewSubmit };
