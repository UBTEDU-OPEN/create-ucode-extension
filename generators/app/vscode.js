const shelljs = require('shelljs');
const inquirer = require('inquirer');
const chalk = require('chalk');

function afterInstallPrompt(isDebug = false) {
  return inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'useVscode',
        message: '安装完成, 是否要用 VSCode 打开?',
        default: true,
      },
    ]);
}

function openWithVscode(destinationRoot, DEBUG = false) {
  if (shelljs.which('code')) {
    console.log(chalk.blue('检测到安装了 VSCode Shell Command'));
    return afterInstallPrompt(DEBUG).then((answer) => {
      if (answer.useVscode) {
        shelljs.exec(`code ${destinationRoot}`);
      }
    });
  }
  return Promise.resolve();
}

module.exports = {
  afterInstallPrompt,
  openWithVscode,
};