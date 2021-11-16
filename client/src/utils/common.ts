import { ICategories } from '@myTypes/Review';

const calcTotal = (categories: ICategories) => {
  const total =
    Object.keys(categories)
      .filter((category) => category !== '_id')
      .map((category) => {
        console.log(categories[category]);
        return categories[category];
      })
      .reduce((total, current) => current + total, 0) / 4;
  return total;
};

export { calcTotal };
