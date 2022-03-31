'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

/**
 * TS
 */
describe('ts-only', () => {
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

/**
 * TS
 * Eslint
 */
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

/**
 * TS
 * 蓝牙
 * 串口
 */
describe('ts-ble-sp', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      name: 'demo',
      developFeatures: ['typescript'],
      hardwareFeatures: ['ble', 'serialport', 'udp_tcp'],
    });
  });

  it('creates files', () => {
    assert.file([
      'src',
      'package.json',
      'babel.config.js',
      'src/index.ts',
      'tsconfig.json',
      'types',
      'src/devices/ble-device.ts',
      'src/devices/sp-device.ts',
      'udp-tcp-server/udp-tcp-server.js',
    ]);
    assert.noFile(['src/index.js', '.eslintrc.js']);
    assert.fileContent([
      ['static/manifest.json', /"id": "[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}"/], // 正确的 UUID
      ['static/manifest.json', `"name": "demo"`], // demo 名字
      ['static/manifest.json', `"supportModes": ["online"]`], // 在线模式
      ['babel.config.js', `'@babel/preset-typescript',`], // 包含 typescript
      ['src/index.ts', `import { spRegister } from './devices/sp-device';`], // 串口协议代码
      ['src/index.ts', `spRegister,`], // 串口协议代码
      ['src/index.ts', `import { bleRegister } from './devices/ble-device';`], // 蓝牙协议代码
      ['src/index.ts', `bleRegister,`], // 蓝牙协议代码
      ['src/index.ts', `import { tcpRegister } from './devices/udp-tcp-device';`], // UDP/TCP协议代码
      ['src/index.ts', `tcpRegister,`], // UDP/TCP协议代码
    ]);
    assert.noFileContent([
      ['src/index.ts', `import { UploadModeRegister } from './upload-mode';`], // 烧录模式代码
      ['src/index.ts', `UploadModeRegister,`], // 烧录模式代码
    ]);
  });
});
/**
 * TS
 * 烧录模式
 */
describe('ts-uploadmode', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      name: 'demo',
      developFeatures: ['typescript'],
      hardwareFeatures: ['uploadmode'],
    });
  });

  it('creates files', () => {
    assert.file(['src', 'package.json', 'babel.config.js', 'src/index.ts', 'tsconfig.json', 'types', 'src/upload-mode']);
    assert.noFile(['src/index.js', '.eslintrc.js', 'udp-tcp-server/udp-tcp-server.js']);
    assert.fileContent([
      ['static/manifest.json', /"id": "[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}"/], // 正确的 UUID
      ['static/manifest.json', `"name": "demo"`], // demo 名字
      ['static/manifest.json', `"supportModes": ["online","upload"]`], // 在线模式 和 烧录模式
      ['babel.config.js', `'@babel/preset-typescript',`], // 包含 typescript
      ['src/index.ts', `import { UploadModeRegister } from './upload-mode';`], // 烧录模式代码
      ['src/index.ts', `UploadModeRegister,`], // 烧录模式代码
    ]);
    assert.noFileContent([
      ['src/index.ts', `import { spRegister } from './devices/sp-device';`], // 串口协议代码
      ['src/index.ts', `spRegister,`], // 串口协议代码
      ['src/index.ts', `import { bleRegister } from './devices/ble-device';`], // 蓝牙协议代码
      ['src/index.ts', `bleRegister,`], // 蓝牙协议代码
      ['src/index.ts', `import { tcpRegister } from './devices/udp-tcp-device';`], // UDP/TCP协议代码
      ['src/index.ts', `tcpRegister,`], // UDP/TCP协议代码
    ]);
  });
});
/**
 * TS
 * 烧录模式
 * 蓝牙
 * 串口
 * Eslint
 */
describe('ts-uploadmode-ble-sp-eslint', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      name: 'demo',
      developFeatures: ['typescript', 'eslint'],
      hardwareFeatures: ['uploadmode', 'ble', 'serialport', 'udp_tcp'],
    });
  });

  it('creates files', () => {
    assert.file([
      'src',
      'package.json',
      'babel.config.js',
      'src/index.ts',
      'tsconfig.json',
      'types',
      'src/devices/ble-device.ts',
      'src/devices/sp-device.ts',
      'src/upload-mode',
      'src/upload-mode/uploader.ts',
      '.eslintrc.js',
      'udp-tcp-server/udp-tcp-server.js',
    ]);
    assert.noFile(['src/index.js']);
    assert.fileContent([
      ['static/manifest.json', /"id": "[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}"/], // 正确的 UUID
      ['static/manifest.json', `"name": "demo"`], // demo 名字
      ['static/manifest.json', `"supportModes": ["online","upload"]`], // 在线模式 和 烧录模式
      ['babel.config.js', `'@babel/preset-typescript',`], // 包含 typescript
      ['src/index.ts', `import { UploadModeRegister } from './upload-mode';`], // 烧录模式代码
      ['src/index.ts', `UploadModeRegister,`], // 烧录模式代码
      ['src/index.ts', `import { spRegister } from './devices/sp-device';`], // 串口协议代码
      ['src/index.ts', `spRegister,`], // 串口协议代码
      ['src/index.ts', `import { bleRegister } from './devices/ble-device';`], // 蓝牙协议代码
      ['src/index.ts', `bleRegister,`], // 蓝牙协议代码
      ['src/index.ts', `import { tcpRegister } from './devices/udp-tcp-device';`], // UDP/TCP协议代码
      ['src/index.ts', `tcpRegister,`], // UDP/TCP协议代码
    ]);
    assert.noFileContent([]);
  });
});
