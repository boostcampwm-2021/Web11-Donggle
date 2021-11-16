interface ICategories {
  safety: number;
  traffic: number;
  food: number;
  entertainment: number;
}

interface IReviewContent {
  text: string;
  user: string;
  categories: ICategories;
}

interface IReviewSubmit {
  address: string;
  text: string;
  user: string;
  categories: ICategories;
}

export { ICategories, IReviewContent, IReviewSubmit };
