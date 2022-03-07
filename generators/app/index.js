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
        type: 'list',
        name: '插件类型',
        message: '请选择插件的类型',
        choices: [
          {
            name: '硬件 Hardware',
            value: 'hardware',
          },
          {
            name: '软件 Software（暂不支持）',
            value: 'software',
          },
        ],
      },
      {
        type: 'confirm',
        name: 'useTS',
        message: '是否使用 TypeScript',
        default: false,
      },
      {
        type: 'confirm',
        name: 'isSupportUploadMode',
        message: '是否需要支持烧录模式',
        default: false,
      },
      {
        type: 'confirm',
        name: 'useEslint',
        message: '是否使用 ESLint',
        default: false,
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
      isSupportUploadMode: this.props.isSupportUploadMode,
      useEslint: this.props.useEslint,
      useTS: this.props.useTS,
    };
  }

  writing() {
    this._copySrc();
    this._copyOthers();
  }

  install() {}

  _copySrc() {
    if (!this.props.isSupportUploadMode) {
      // 如果不支持烧录模式, 则忽略 以下文件
      this.ignore.push('**/*/src/upload-mode/**/*.*');
      this.ignore.push('**/*/src/upload-mode/**/*.*');
    }
    const srcPath = path.join(__dirname, 'template/src', this.props.useTS ? 'ts-src' : 'js-src');
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
    if (!this.props.useEslint) {
      // 如果不支持 ESLint, 则忽略 以下文件
      this.ignore.push('**/*/.eslintrc.js');
      this.ignore.push('**/*/.prettierrc.js');
    }
    if (!this.props.useTS) {
      // 如果不是 TypeScript 需要忽略这些文件
      this.ignore.push('**/*/types/*.d.ts');
      this.ignore.push('**/*/tsconfig.json');
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
