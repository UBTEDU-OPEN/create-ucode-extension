const path = require('path');
const { spawn } = require('child_process');

const uuid = require('uuid');
const memFs = require('mem-fs');
const editor = require('mem-fs-editor');
const chalk = require('chalk');
const shelljs = require('shelljs');

const prompt = require('./prompt');


function npmInstall(useYarn, dir) {
  let tool;
  if (useYarn) {
    tool = 'yarn';
  } else {
    tool = 'npm';
  }
  if (tool === 'yarn') {
    if (!shelljs.which('yarn')) {
      console.log(chalk.red('没有检测到 yarn, 切换为: npm 安装'));
      tool = 'npm';
    }
  }
  console.log(`${tool} install`);
  shelljs.cd(dir);

  return new Promise((resolve, reject) => {
    const installProcess = spawn(tool, ['install'], { cwd: dir, stdio: 'inherit' });
    installProcess.on('exit', () => {
      resolve();
    });
    installProcess.on('error', (error) => {
      reject(error);
    })
  });
}

class Generator {
  props = {};
  ignore = [];
  destinationRoot = undefined;
  sourceRoot = undefined;
  fs = undefined;
  store = undefined;
  DEBUG = false; // DEBUG 模式不会生成真正的文件, 并且参数是外部提供
  constructor(debug) {
    if (debug !== undefined) {
      this.DEBUG = debug;
    } else {
      this.DEBUG = process.env.DEBUG !== undefined;
    }
    this.store = memFs.create();
    this.fs = editor.create(this.store);
  }

  prompt() {
    return new Promise((resolve, reject) => {
      prompt()
        .then((answer) => {
          this.props = answer;
          resolve();
        })
        .catch(reject);
    });
  }

  init() {
    const dirName = this.props.name;
    this.destinationRoot = path.join(process.cwd(), dirName);
    this.sourceRoot = path.join(__dirname, 'template');
    this.CommonProperty = {
      id: uuid.v4(),
      name: this.props.name,
      hardwareFeatures: this.props.hardwareFeatures,
      developFeatures: this.props.developFeatures,
    };
    this._ignoreFiles();
    if (!this.DEBUG) {
      shelljs.mkdir('-p', this.destinationRoot);
    }
  }

  copyFiles() {
    this._copySrc();
    this._copyOthers();
    this._copyNpmrc();
  }

  finish() {
    const result = this.fs.dump();
    const filelist = Object.keys(result)
      .map((k) => `  ${chalk.green('create')} ${k}`)
      .join('\n');
    if (this.DEBUG) {
      // console.log('finish:', this.store.get('src/upload-modexxx'));
      return this.store;
    }
    this.fs.commit();
    console.log(filelist);
    return filelist;
  }

  generate() {
    return this.prompt()
      .then(() => this.init())
      .then(() => this.copyFiles())
      .then(() => this.finish())
      .then((list) => {
        if (this.DEBUG || !this.props.isInstall) {
          return list;
        }
        return this.installDependencies();
      });
  }

  assert(property) {
    this.props = property;
    this.init();
    this.copyFiles();
    return this.finish();
  }

  installDependencies() {
    return npmInstall(this.props.useYarn, this.destinationRoot);
  }

  _ignoreFiles() {
    if (!this.props.hardwareFeatures.includes('custom_ui')) {
      // 如果支持 自定义组件
      this.ignore.push('**/*/components/**/*.*');
    }
    if (!this.props.hardwareFeatures.includes('uploadmode')) {
      // 如果不支持烧录模式, 则忽略 以下文件
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
  }

  _copySrc() {
    const srcPath = path.join(this.sourceRoot, 'src', this.props.developFeatures.includes('typescript') ? 'ts-src' : 'js-src');
    this.fs.copyTpl(
      srcPath,
      path.join(this.destinationRoot, 'src'),
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
    const sourcedir = path.join(this.sourceRoot, 'others/**/*.*');
    this.fs.copyTpl(
      sourcedir,
      this.destinationRoot,
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

  /**
   * npm publish 会忽略掉 .npmrc (目前没找到办法解决), 需要单独拷贝文件, 而且名字不能是 `.npmrc`
   */
  _copyNpmrc() {
    const source = path.join(this.sourceRoot, 'manual/npmrc');
    const dest = path.join(this.destinationRoot, '.npmrc');
    this.fs.copy(source, dest);
  }
}

module.exports = Generator;
