// https://wonit.tistory.com/366 참고

// 반응형 디자인을 위한 픽셀 컨버팅 함수
const pixelToRem = (size: number): string => `${size / 16}rem`;

type ThemeComponent = {
  [font: string]: string;
};

type Theme = {
  componentSize: ThemeComponent;
  fontSizes: ThemeComponent;
  colors: ThemeComponent;
  common: ThemeComponent;
};

const componentSize: ThemeComponent = {
  header: '140px',
  headerLayout: '80px',
  headerColorbar: '60px',
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
  black: '#000000',
  whitesmoke: '#F5F5F5',
  lightgrey: '#C4C4C4',
  ashgrey: '#666362',
  yellow: '#F5C244',
  white: '#FFFFFF',
  blue: '#0000FF',
  darkblue: '#00008B',
  deepseablue: '#123456',
  lightwhite: '#FFFFF7',
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
  componentSize,
  fontSizes,
  colors,
  common,
};

export default theme;
