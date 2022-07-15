module.exports = {
  root: true,
  rules: {},
<%_ if (developFeatures.includes('typescript')) { _%>
  extends: require.resolve('@ubtech/ucode-extension-developer-kit/lint/typescript.config.js'),
<%_ } else { _%>
  extends: require.resolve('@ubtech/ucode-extension-developer-kit/lint/javascript.config.js'),
<%_ } _%>
};
