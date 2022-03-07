module.exports = {
  presets: [
    '@babel/preset-env',
  <%_ if (useTS) { _%>
    '@babel/preset-typescript',
  <%_ } _%>
  ],
};
