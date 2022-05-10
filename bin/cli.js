#!/usr/bin/env node
const chalk = require('chalk');
const Greeting = require('../generators/app/greeting');
const Generator = require('../generators/app');
const { openWithVscode } = require('../generators/app/vscode');

const hello = chalk.hex('#FF7F6F');

console.log(hello(Greeting));
const generator = new Generator();
generator.generate()
.then((result) => console.log(chalk.green('脚手架 安装成功!')))
.then(() => openWithVscode(generator.destinationRoot, generator.DEBUG))
.catch((error) => {
  console.log(chalk.red('脚手架 安装失败'));
  console.trace(error);
});
