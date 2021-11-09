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

// const scaledToSmallest = (scaledAddress: string, scale: number) => {
//   switch (true) {
//     case scale < 9:
//       const split = scaledAddress.split(' ');
//       return split[split.length - 1];
//     case 9 <= scale && scale < 12:
//       return scaledAddress.split(' ').slice(1).join(' ');
//     case scale >= 12:
//       return scaledAddress.split(' ')[0];
//     default:
//       return scaledAddress;
//   }
// };

export { regionToScaled, regionToSmallest };
