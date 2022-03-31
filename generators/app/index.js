const Generator = require('yeoman-generator');
const { version } = require('../../package.json');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const path = require('path');
const uuid = require('uuid');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`uCode v4 ${chalk.red('插件脚手架')} v${version}`));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: '请输入插件的名字',
        validate: function (input) {
          if (/^[a-z][a-z0-9_-]*$/.test(input)) {
            return true;
          }
          return '只能包含小写字母，减号，下划线，数字(不能数字和符号开头），需要作为文件名和 npm 包名，后面可以在 manifest.json 里面 name 字段进行修改';
        },
        default: 'demo',
      },
      {
        type: 'checkbox',
        name: 'hardwareFeatures',
        message: '要开启的硬件功能',
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
          },
          {
            name: '使用 ESLint',
            value: 'eslint',
          },
        ],
      },
    ];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  paths() {
    this.ignore = [];
    this.sourceRoot(path.join(__dirname, './template/'));
    const dirName = `ucodev4-ext-${this.props.name}`;
    mkdirp(dirName);
    this.destinationRoot(dirName);
    // console.debug('this.ignore', this.ignore);
  }

  default() {
    this.ext_uuid = uuid.v4();
    this.CommonProperty = {
      id: this.ext_uuid,
      name: this.props.name,
      hardwareFeatures: this.props.hardwareFeatures,
      developFeatures: this.props.developFeatures,
    };
  }

  writing() {
    this._copySrc();
    this._copyOthers();
  }

  install() {}

  _copySrc() {
    if (!this.props.hardwareFeatures.includes('uploadmode')) {
      // 如果不支持烧录模式, 则忽略 以下文件
      this.ignore.push('**/*/upload-mode/**/*.*');
      this.ignore.push('**/*/upload-mode/**/*.*');
    }

    if (!this.props.hardwareFeatures.includes('ble')) {
      // 如果不开启蓝牙
      this.ignore.push('**/*/devices/ble-device.?(js|ts)');
    }
    if (!this.props.hardwareFeatures.includes('serialport')) {
      // 如果不开启蓝牙
      this.ignore.push('**/*/devices/sp-device.?(js|ts)');
    }
    if (!this.props.hardwareFeatures.includes('udp_tcp')) {
      // 如果不开启UDP/TCP
      this.ignore.push('**/*/devices/udp-tcp-device.?(js|ts)');
    }
    const srcPath = path.join(__dirname, 'template/src', this.props.developFeatures.includes('typescript') ? 'ts-src' : 'js-src');
    this.fs.copyTpl(
      this.templatePath(srcPath),
      this.destinationPath('src'),
      this.CommonProperty,
      {},
      {
        globOptions: {
          ignore: this.ignore,
          dot: true,
        },
      }
    );
  }

  _copyOthers() {
    if (!this.props.developFeatures.includes('eslint')) {
      // 如果不支持 ESLint, 则忽略 以下文件
      this.ignore.push('**/*/.eslintrc.js');
      this.ignore.push('**/*/.prettierrc.js');
    }
    if (!this.props.developFeatures.includes('typescript')) {
      // 如果不是 TypeScript 需要忽略这些文件
      this.ignore.push('**/*/types/*.d.ts');
      this.ignore.push('**/*/tsconfig.json');
    }
    if (!this.props.hardwareFeatures.includes('udp_tcp')) {
      // 如果不开启UDP/TCP
      this.ignore.push('**/*/udp-tcp-server');
    }
    const dir = path.join(__dirname, 'template/others/**/*.*');
    this.fs.copyTpl(
      this.templatePath(dir),
      this.destinationPath('.'),
      this.CommonProperty,
      {},
      {
        globOptions: {
          ignore: this.ignore,
          dot: true,
        },
      }
    );
  }
};
