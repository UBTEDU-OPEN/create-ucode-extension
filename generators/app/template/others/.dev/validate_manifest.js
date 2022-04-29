const Ajv = require('ajv');
const schema = require('./manifest_schema.json');
const input = require('../static/manifest.json');

const ajv = new Ajv();

const validate = ajv.compile(schema);

const valid = validate(input);

if (!valid) {
  console.log(validate.errors);
  throw new Error('Manifest 校验出错');
} else {
  console.log('schema validate success');
}
