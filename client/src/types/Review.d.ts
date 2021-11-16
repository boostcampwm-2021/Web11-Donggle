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

interface IReviewContent extends IReviewSubmit {
  _id: string;
  center: [number, number];
  code: string;
  createdAt: Date;
}

export { ICategories, IReviewContent, IReviewSubmit };
