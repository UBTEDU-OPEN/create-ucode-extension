module.exports = {
  presets: [
    '@babel/preset-env',
  <%_ if (developFeatures.includes('typescript')) { _%>
    '@babel/preset-typescript',
  <%_ } _%>
  <%_ if (hardwareFeatures.includes('custom_ui')) { _%>
    '@babel/preset-react',
  <%_ } _%>
  ],
};
