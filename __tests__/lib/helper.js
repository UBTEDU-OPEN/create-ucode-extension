const assert = require('assert');
const path = require('path');
const Generator = require('../../generators/app');
const chalk = require('chalk');

function convertArgs(args) {
  if (args.length > 1) {
    return [Array.from(args)];
  }
  const arg = args[0];
  return Array.isArray(arg) ? arg : [arg];
}

class AssertHelper {
  result = undefined;
  destinationRoot = undefined;
  constructor() {}

  run(props) {
    const generator = new Generator(true);
    this.result = generator.assert(props);
    this.destinationRoot = generator.destinationRoot;
  }

  fileExists(filepath) {
    const p = path.join(this.destinationRoot, filepath);
    return this.result.existsInMemory(p);
    // console.log(f);
    // const files = this.result.all().map((f) => f.path);
    // console.log(files);
    // // return files.indexOf(file) > -1;
    // return this.result.all().find((f) => f.path.includes(file));
  }

  readFile(filepath) {
    // console.log(this.result.all().map((f) => f.path));
    const p = path.join(this.destinationRoot, filepath);
    // console.log(p);
    const file = this.result.get(p);
    // console.log(file.contents, file.isNull());
    return file.contents.toString();
  }

  noFile(...args) {
    convertArgs(args).forEach((file) => {
      const here = this.fileExists(file);
      assert.ok(!here, `${chalk.red(file)} exists`);
    });
  }
  file(...args) {
    convertArgs(args).forEach((file) => {
      const here = this.fileExists(file);
      assert.ok(here, `${chalk.red(file)}, no such file or directory`);
    });
  }
  fileContent(...args) {
    convertArgs(args).forEach((pair) => {
      const file = pair[0];
      const regex = pair[1];
      this.fileExists(file);
      const body = this.readFile(file);
      // console.log(body);

      let match = false;
      if (typeof regex === 'string') {
        match = body.indexOf(regex) !== -1;
      } else {
        match = regex.test(body);
      }

      assert(match, `${chalk.red(file)} did not match '${chalk.blue(regex)}'. Contained:\n\n${body}`);
    });
  }
  noFileContent(...args) {
    convertArgs(args).forEach((pair) => {
      const file = pair[0];
      const regex = pair[1];
      this.fileExists(file);
      const body = this.readFile(file);

      if (typeof regex === 'string') {
        assert.ok(body.indexOf(regex) === -1, `${file} matched '${regex}'.`);
        return;
      }

      assert.ok(!regex.test(body), `${file} matched '${regex}'.`);
    });
  }
}

module.exports = AssertHelper;
