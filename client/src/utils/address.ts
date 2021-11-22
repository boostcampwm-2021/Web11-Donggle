import { IRange } from '@myTypes/Map';

const regionToScaled = (region: string[], scale: number) => {
  if (region.length < 3) return region.join(' ');
  const [big, medium, small] = region;

  switch (true) {
    case scale < 9:
      return `${big} ${medium} ${small}`;
    case 9 <= scale && scale < 12:
      return `${big} ${medium}`;
    case scale >= 12:
      return big;
    default:
      return `${big} ${medium} ${small}`;
  }
};

const regionToSmallest = (region: string[], scale: number) => {
  if (region.length < 3) return region[region.length - 1] ?? '';
  const [big, medium, small] = region;

  switch (true) {
    case scale < 9:
      return small;
    case 9 <= scale && scale < 12:
      return medium;
    case scale >= 12:
      return big;
    default:
      return `${big} ${medium} ${small}`;
  }
};

const regionToRange = (region: string[], scale: number): IRange => {
  const [big, medium] = region;
  const range: IRange = {
    address: '',
    scope: 'big',
  };

  switch (true) {
    case scale < 9:
      range.scope = 'small';
      range.address = `${big} ${medium}`;
      break;
    case 9 <= scale && scale < 12:
      range.scope = 'medium';
      range.address = `${big}`;
      break;
    case scale >= 12:
      range.scope = 'big';
      break;
  }
  return range;
};

export { regionToScaled, regionToSmallest, regionToRange };
