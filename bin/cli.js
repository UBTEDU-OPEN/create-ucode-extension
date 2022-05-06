#!/usr/bin/env node
const chalk = require('chalk');
const Greeting = require('../generators/app/greeting');
const Generator = require('../generators/app');

const hello = chalk.hex('#FF7F6F');

console.log(hello(Greeting));
const generator = new Generator();
generator.generate().then((result) => {
  // console.log('result', result);
});
