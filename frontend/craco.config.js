// eslint-disable-next-line @typescript-eslint/no-var-requires
const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        // as you know, CRA doesn't allow to modify tsconfig's compilerOptions
        // so you should create a separate JSON file and extend tsconfig.json from it
        // and then just specify its path here:
        tsConfigPath: './tsconfig.path.json',
      },
    },
  ],
};
