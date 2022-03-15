module.exports = {
  presets: [
    '@babel/preset-env',
  <%_ if (developFeatures.includes('typescript')) { _%>
    '@babel/preset-typescript',
  <%_ } _%>
  ],
};
