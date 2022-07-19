const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

function prompt(isDebug = false) {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: '请输入插件的名字',
          validate: function (input) {
            if (/^[a-z][a-z0-9_-]*$/.test(input)) {
              if (!isDebug && fs.existsSync(path.join(process.cwd(), input))) {
                return `${input} 文件夹已经存在`;
              }
              return true;
            }
            return '只能包含小写字母，减号，下划线，数字(不能数字和符号开头），需要作为文件名和 npm 包名，后面可以在 manifest.json 里面 name 字段进行修改';
          },
          default: 'demo',
        },
        {
          type: 'checkbox',
          name: 'hardwareFeatures',
          message: '要集成的特性',
          choices: [
            {
              name: '串口协议 SerialPort',
              value: 'serialport',
            },
            {
              name: '蓝牙协议 Ble',
              value: 'ble',
            },
            {
              name: 'UDP/TCP协议 UDP/TCP',
              value: 'udp_tcp',
            },
            {
              name: '烧录模式',
              value: 'uploadmode',
            },
            {
              name: '自定义 UI 组件 *(Beta)',
              value: 'custom_ui',
            },
            {
              name: '国际化支持',
              value: 'i18n'
            }
          ],
        },
        {
          type: 'checkbox',
          name: 'developFeatures',
          message: '要支持的开发功能',
          choices: [
            {
              name: '使用 TypeScript',
              value: 'typescript',
              checked: true,
            },
            {
              name: '使用 ESLint',
              value: 'eslint',
              checked: true,
            },
          ],
        },
        {
          type: 'confirm',
          name: 'betaEnable',
          message: '是否要启用 Beta 特性, 正式版本可能会不兼容? (选否, 会去掉beta特性)',
          when(results) {
            return results.hardwareFeatures.includes('custom_ui');
          },
        },
        {
          type: 'confirm',
          name: 'isInstall',
          message: '是否要安装依赖?',
          default: true,
        },
        {
          type: 'confirm',
          name: 'useYarn',
          message: '是否要使用 Yarn 安装依赖?',
          default: true,
          when(results) {
            return results.isInstall;
          },
        },
      ])
      .then((answers) => {
        if (!answers.betaEnable) {
          const index = answers.hardwareFeatures.indexOf('custom_ui');
          if (index > -1) {
            answers.hardwareFeatures.splice(index, 1);
          }
        }
        resolve(answers);
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
          console.error('脚手架错误: 参数渲染遇到问题');
        } else {
          console.error('脚手架错误: %s', error);
          // Something else went wrong
        }
        reject(error);
      });
  });
}

module.exports = prompt;
