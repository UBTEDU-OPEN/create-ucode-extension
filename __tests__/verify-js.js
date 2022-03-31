'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

/**
 * JS
 * 无任何特性
 */
describe('js-no-features', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      name: 'demo',
      developFeatures: [],
      hardwareFeatures: [],
    });
  });

  it('creates files', () => {
    assert.file(['src', 'package.json', 'babel.config.js', 'src/index.js']);
    assert.noFile([
      'tsconfig.json',
      'types',
      'src/index.ts',
      'upload-mode',
      '.eslintrc.js',
      'udp-tcp-server/udp-tcp-server.js',
    ]);
    assert.fileContent([
      ['static/manifest.json', /"id": "[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}"/], // 正确的 UUID
      ['static/manifest.json', `"name": "demo"`], // demo 名字
      ['static/manifest.json', `"supportModes": ["online"]`], // 只有在线模式
    ]);
    assert.noFileContent([
      ['babel.config.js', `'@babel/preset-typescript',`], // 不包含 typescript
      ['src/index.js', `import { UploadModeRegister } from './upload-mode';`], // 不包含烧录模式代码
      ['src/index.js', `UploadModeRegister,`], // 不包含烧录模式代码
      ['src/index.js', `import { spRegister } from './devices/sp-device';`], // 不包含串口协议代码
      ['src/index.js', `spRegister,`], // 不包含串口协议代码
      ['src/index.js', `import { bleRegister } from './devices/ble-device';`], // 不包含蓝牙协议代码
      ['src/index.js', `bleRegister,`], // 不包含蓝牙协议代码
      ['src/index.js', `import { tcpRegister } from './devices/udp-tcp-device';`], // 不包含UDP/TCP协议代码
      ['src/index.js', `tcpRegister,`], // 不包含UDP/TCP协议代码
    ]);
  });
});

/**
 * js
 * 烧录模式
 */
describe('js-uploadmode', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      name: 'demo',
      developFeatures: [],
      hardwareFeatures: ['uploadmode'],
    });
  });

  it('creates files', () => {
    assert.file(['src', 'package.json', 'babel.config.js', 'src/index.js', 'src/upload-mode']);
    assert.noFile(['tsconfig.json', 'types', 'src/index.ts', 'udp-tcp-server/udp-tcp-server.js']);
    assert.fileContent([
      ['static/manifest.json', /"id": "[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}"/], // 正确的 UUID
      ['static/manifest.json', `"name": "demo"`], // demo 名字
      ['static/manifest.json', `"supportModes": ["online","upload"]`], // 包含烧录模式
      ['src/index.js', `import { UploadModeRegister } from './upload-mode';`], // 包含烧录模式代码
      ['src/index.js', `UploadModeRegister,`], // 包含烧录模式代码
    ]);
    assert.noFileContent([
      ['babel.config.js', `'@babel/preset-typescript',`], // 不包含 typescript
      ['src/index.js', `import { spRegister } from './devices/sp-device';`], // 不包含串口协议代码
      ['src/index.js', `spRegister,`], // 不包含串口协议代码
      ['src/index.js', `import { bleRegister } from './devices/ble-device';`], // 不包含蓝牙协议代码
      ['src/index.js', `bleRegister,`], // 不包含蓝牙协议代码
      ['src/index.js', `import { tcpRegister } from './devices/udp-tcp-device';`], // 不包含UDP/TCP协议代码
      ['src/index.js', `tcpRegister,`], // 不包含UDP/TCP协议代码
    ]);
  });
});

/**
 * js
 * eslint
 */
describe('js-eslint', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      name: 'demo',
      developFeatures: ['eslint'],
      hardwareFeatures: [],
    });
  });

  it('creates files', () => {
    assert.file(['src', 'package.json', 'babel.config.js', 'src/index.js', '.eslintrc.js']);
    assert.noFile(['tsconfig.json', 'types', 'src/index.ts', 'src/upload-mode', 'udp-tcp-server/udp-tcp-server.js']);
    assert.fileContent([
      ['static/manifest.json', /"id": "[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}"/], // 正确的 UUID
      ['static/manifest.json', `"name": "demo"`], // demo 名字
      ['static/manifest.json', `"supportModes": ["online"]`], // 只有在线模式
    ]);
    assert.noFileContent([
      ['babel.config.js', `'@babel/preset-typescript',`], // 不包含 typescript
      ['src/index.js', `import { UploadModeRegister } from './upload-mode';`], // 不包含烧录模式代码
      ['src/index.js', `UploadModeRegister,`], // 不包含烧录模式代码
      ['src/index.js', `import { spRegister } from './devices/sp-device';`], // 不包含串口协议代码
      ['src/index.js', `spRegister,`], // 不包含串口协议代码
      ['src/index.js', `import { bleRegister } from './devices/ble-device';`], // 不包含蓝牙协议代码
      ['src/index.js', `bleRegister,`], // 不包含蓝牙协议代码
      ['src/index.js', `import { tcpRegister } from './devices/udp-tcp-device';`], // 不包含UDP/TCP协议代码
      ['src/index.js', `tcpRegister,`], // 不包含UDP/TCP协议代码
    ]);
  });
});

/**
 * JS
 * 蓝牙
 * 串口
 */
describe('js-ble-sp', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      name: 'demo',
      developFeatures: [],
      hardwareFeatures: ['ble', 'serialport', 'udp_tcp'],
    });
  });

  it('creates files', () => {
    assert.file([
      'src',
      'package.json',
      'babel.config.js',
      'src/index.js',
      'src/devices/sp-device.js',
      'src/devices/ble-device.js',
      'udp-tcp-server/udp-tcp-server.js',
    ]);
    assert.noFile(['tsconfig.json', 'types', 'src/index.ts', 'upload-mode', '.eslintrc.js']);
    assert.fileContent([
      ['static/manifest.json', /"id": "[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}"/], // 正确的 UUID
      ['static/manifest.json', `"name": "demo"`], // demo 名字
      ['static/manifest.json', `"supportModes": ["online"]`], // 只有在线模式
      ['src/index.js', `import { spRegister } from './devices/sp-device';`], // 包含串口协议代码
      ['src/index.js', `spRegister,`], // 包含串口协议代码
      ['src/index.js', `import { bleRegister } from './devices/ble-device';`], // 包含蓝牙协议代码
      ['src/index.js', `bleRegister,`], // 包含蓝牙协议代码
      ['src/index.js', `import { tcpRegister } from './devices/udp-tcp-device';`], // UDP/TCP协议代码
      ['src/index.js', `tcpRegister,`], // UDP/TCP协议代码
    ]);
    assert.noFileContent([
      ['babel.config.js', `'@babel/preset-typescript',`], // 不包含 typescript
      ['src/index.js', `import { UploadModeRegister } from './upload-mode';`], // 不包含烧录模式代码
      ['src/index.js', `UploadModeRegister,`], // 不包含烧录模式代码
    ]);
  });
});

/**
 * JS
 * 蓝牙
 * 串口
 * 烧录
 * eslint
 */
describe('js-enable-uploadmode-ble-sp-eslint', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      name: 'demo',
      developFeatures: ['eslint'],
      hardwareFeatures: ['uploadmode', 'ble', 'serialport', 'udp_tcp'],
    });
  });

  it('creates files', () => {
    assert.file([
      'src',
      'package.json',
      'babel.config.js',
      'src/index.js',
      'src/devices/sp-device.js',
      'src/devices/ble-device.js',
      'src/upload-mode',
      'src/upload-mode/uploader.js',
      '.eslintrc.js',
      'udp-tcp-server/udp-tcp-server.js',
    ]);
    assert.noFile(['tsconfig.json', 'types', 'src/index.ts']);
    assert.fileContent([
      ['static/manifest.json', /"id": "[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}"/], // 正确的 UUID
      ['static/manifest.json', `"name": "demo"`], // demo 名字
      ['static/manifest.json', `"supportModes": ["online","upload"]`], // 烧录模式
      ['src/index.js', `import { UploadModeRegister } from './upload-mode';`], // 烧录模式代码
      ['src/index.js', `UploadModeRegister,`], // 烧录模式代码
      ['src/index.js', `import { spRegister } from './devices/sp-device';`], // 串口协议代码
      ['src/index.js', `spRegister,`], // 串口协议代码
      ['src/index.js', `import { bleRegister } from './devices/ble-device';`], // 蓝牙协议代码
      ['src/index.js', `bleRegister,`], // 蓝牙协议代码
      ['src/index.js', `import { tcpRegister } from './devices/udp-tcp-device';`], // UDP/TCP协议代码
      ['src/index.js', `tcpRegister,`], // UDP/TCP协议代码
    ]);
    assert.noFileContent([
      ['babel.config.js', `'@babel/preset-typescript',`], // 不包含 typescript
    ]);
  });
});

describe('enable-ts', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      name: 'demo',
      developFeatures: ['typescript'],
      hardwareFeatures: [],
    });
  });

  it('creates files', () => {
    assert.file(['src', 'package.json', 'babel.config.js', 'src/index.ts', 'tsconfig.json', 'types']);
    assert.noFile(['src/index.js', 'src/upload-mode', '.eslintrc.js', 'udp-tcp-server/udp-tcp-server.js']);
    assert.fileContent([
      ['static/manifest.json', /"id": "[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}"/], // 正确的 UUID
      ['static/manifest.json', `"name": "demo"`], // demo 名字
      ['static/manifest.json', `"supportModes": ["online"]`], // 只有在线模式
      ['babel.config.js', `'@babel/preset-typescript',`], // 包含 typescript
    ]);
    assert.noFileContent([
      ['src/index.ts', `import { UploadModeRegister } from './upload-mode';`], // 不包含烧录模式代码
      ['src/index.ts', `UploadModeRegister,`], // 不包含烧录模式代码
      ['src/index.ts', `import { spRegister } from './devices/sp-device';`], // 不包含串口协议代码
      ['src/index.ts', `spRegister,`], // 不包含串口协议代码
      ['src/index.ts', `import { bleRegister } from './devices/ble-device';`], // 不包含蓝牙协议代码
      ['src/index.ts', `bleRegister,`], // 不包含蓝牙协议代码
      ['src/index.ts', `import { tcpRegister } from './devices/udp-tcp-device';`], // 不包含UDP/TCP协议代码
      ['src/index.ts', `tcpRegister,`], // 不包含UDP/TCP协议代码
    ]);
  });
});

describe('enable-ts-eslint', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      name: 'demo',
      developFeatures: ['typescript', 'eslint'],
      hardwareFeatures: [],
    });
  });

  it('creates files', () => {
    assert.file(['src', 'package.json', 'babel.config.js', 'src/index.ts', 'tsconfig.json', 'types', '.eslintrc.js']);
    assert.noFile(['src/index.js', 'src/upload-mode', 'udp-tcp-server/udp-tcp-server.js']);
    assert.fileContent([
      ['static/manifest.json', /"id": "[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}"/], // 正确的 UUID
      ['static/manifest.json', `"name": "demo"`], // demo 名字
      ['static/manifest.json', `"supportModes": ["online"]`], // 只有在线模式
      ['babel.config.js', `'@babel/preset-typescript',`], // 包含 typescript
    ]);
    assert.noFileContent([
      ['src/index.ts', `import { UploadModeRegister } from './upload-mode';`], // 不包含烧录模式代码
      ['src/index.ts', `UploadModeRegister,`], // 不包含烧录模式代码
      ['src/index.ts', `import { spRegister } from './devices/sp-device';`], // 不包含串口协议代码
      ['src/index.ts', `spRegister,`], // 不包含串口协议代码
      ['src/index.ts', `import { bleRegister } from './devices/ble-device';`], // 不包含蓝牙协议代码
      ['src/index.ts', `bleRegister,`], // 不包含蓝牙协议代码
      ['src/index.ts', `import { tcpRegister } from './devices/udp-tcp-device';`], // 不包含UDP/TCP协议代码
      ['src/index.ts', `tcpRegister,`], // 不包含UDP/TCP协议代码
    ]);
  });
});
