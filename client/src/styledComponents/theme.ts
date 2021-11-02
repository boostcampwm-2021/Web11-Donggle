// https://wonit.tistory.com/366 참고

// 반응형 디자인을 위한 픽셀 컨버팅 함수
const pixelToRem = (size: number): string => `${size / 16}rem`;

type ThemeComponent = {
  [font: string]: string;
};

type Theme = {
  fontSizes: ThemeComponent;
  colors: ThemeComponent;
  common: ThemeComponent;
};

const fontSizes: ThemeComponent = {
  title: pixelToRem(60),
  subtitle: pixelToRem(30),
  paragraph: pixelToRem(18),
};

const colors: ThemeComponent = {
  green: '#33AB74',
  lightgreen: '#70C49D',
  grey: '#E5E5E5',
  black: '#000080',
  lightgrey: '#C4C4C4',
  yellow: '#F5C244',
  white: '#FFFFFF',
};

const common: ThemeComponent = {
  flexCenter: `
    display: flex;
    justify-contents: center;
    align-items: center;
  `,
  flexColumn: `
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  flexRow: `
  display: flex;
  flex-direction: row;
  align-items: center;
`,
};

// theme 객체에 감싸서 반환한다.
const theme: Theme = {
  fontSizes,
  colors,
  common,
};

export default theme;
