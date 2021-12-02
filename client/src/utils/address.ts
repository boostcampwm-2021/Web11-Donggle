import { IRange } from '@myTypes/Map';

const regionToRange = (region: string[], scale: number): IRange => {
  const [big, medium] = region;
  const range: IRange = {
    address: '',
    scope: 'big',
  };

  switch (true) {
    case scale < 8:
      range.scope = 'small';
      range.address = `${big} ${medium}`;
      break;
    case 8 <= scale && scale < 12:
      range.scope = 'medium';
      range.address = `${big}`;
      break;
    case scale >= 12:
      range.scope = 'big';
      break;
  }
  return range;
};

const rangeToLabel = (
  address: string,
  scope: 'big' | 'medium' | 'small',
): string => {
  if (scope === 'big') return address;
  if (scope === 'medium') return address.split(' ').slice(1).join(' ');
  const tokens = address.split(' ');
  return tokens[tokens.length - 1];
};

export { regionToRange, rangeToLabel };
