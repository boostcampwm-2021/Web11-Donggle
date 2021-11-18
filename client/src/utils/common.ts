import { ICategories } from '@myTypes/Review';

const calcTotal = (categories: ICategories) => {
  const total =
    Object.keys(categories)
      .map((category) => categories[category])
      .reduce((total, current) => current + total, 0) / 4;
  return total;
};

export { calcTotal };
