'use strict';
const AssertHelper = require('./lib/helper');

describe('js-test', () => {
  /**
   * JS
   * 无任何特性
   */
  test('js-no-features', () => {
    const helper = new AssertHelper();
    helper.run({
      name: 'demo',
      developFeatures: [],
      hardwareFeatures: [],
    });
    helper.file(['package.json', 'babel.config.js', 'src/index.js']);
    helper.noFile([
      'tsconfig.json',
      'types',
      'src/index.ts',
      'upload-mode',
      '.eslintrc.js',
      'udp-tcp-server/udp-tcp-server.js',
      'src/components/example.jsx',
    ]);
    helper.fileContent([
      ['static/manifest.json', /"id": "[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}"/], // 正确的 UUID
      ['static/manifest.json', `"name": "demo"`], // demo 名字
      ['static/manifest.json', `"supportModes": ["online"]`], // 只有在线模式
    ]);
    helper.noFileContent([
      ['babel.config.js', `'@babel/preset-typescript',`], // 不包含 typescript
      ['babel.config.js', `'@babel/preset-react',`], // 不包含 react
      ['src/index.js', `import { UploadModeRegister } from './upload-mode';`], // 不包含烧录模式代码
      ['src/index.js', `UploadModeRegister,`], // 不包含烧录模式代码
      ['src/index.js', `import { spRegister } from './devices/sp-device';`], // 不包含串口协议代码
      ['src/index.js', `spRegister,`], // 不包含串口协议代码
      ['src/index.js', `import { bleRegister } from './devices/ble-device';`], // 不包含蓝牙协议代码
      ['src/index.js', `bleRegister,`], // 不包含蓝牙协议代码
      ['src/index.js', `import { tcpRegister } from './devices/udp-tcp-device';`], // 不包含UDP/TCP协议代码
      ['src/index.js', `tcpRegister,`], // 不包含UDP/TCP协议代码
      ['src/index.js', `import { DemoComp } from './components/example';`], // 不包含自定义UI代码
    ]);
  });

  /**
   * js
   * 烧录模式
   */
  test('js-uploadmode', () => {
    const helper = new AssertHelper();
    helper.run({
      name: 'demo',
      developFeatures: [],
      hardwareFeatures: ['uploadmode'],
    });
    helper.file(['package.json', 'babel.config.js', 'src/index.js', 'src/upload-mode/uploader.js']);
    helper.noFile(['tsconfig.json', 'types', 'src/index.ts', 'udp-tcp-server/udp-tcp-server.js']);
    helper.fileContent([
      ['static/manifest.json', /"id": "[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}"/], // 正确的 UUID
      ['static/manifest.json', `"name": "demo"`], // demo 名字
      ['static/manifest.json', `"supportModes": ["online","upload"]`], // 包含烧录模式
      ['src/index.js', `import { UploadModeRegister } from './upload-mode';`], // 包含烧录模式代码
      ['src/index.js', `UploadModeRegister,`], // 包含烧录模式代码
    ]);
    helper.noFileContent([
      ['babel.config.js', `'@babel/preset-typescript',`], // 不包含 typescript
      ['src/index.js', `import { spRegister } from './devices/sp-device';`], // 不包含串口协议代码
      ['src/index.js', `spRegister,`], // 不包含串口协议代码
      ['src/index.js', `import { bleRegister } from './devices/ble-device';`], // 不包含蓝牙协议代码
      ['src/index.js', `bleRegister,`], // 不包含蓝牙协议代码
      ['src/index.js', `import { tcpRegister } from './devices/udp-tcp-device';`], // 不包含UDP/TCP协议代码
      ['src/index.js', `tcpRegister,`], // 不包含UDP/TCP协议代码
    ]);
  });

  /**
   * js
   * eslint
   */
  test('js-eslint', () => {
    const helper = new AssertHelper();
    helper.run({
      name: 'demo',
      developFeatures: ['eslint'],
      hardwareFeatures: [],
    });
    helper.file(['package.json', 'babel.config.js', 'src/index.js', '.eslintrc.js']);
    helper.noFile([
      'tsconfig.json',
      'types',
      'src/index.ts',
      'src/upload-mode/uploader.js',
      'udp-tcp-server/udp-tcp-server.js',
    ]);
    helper.fileContent([
      ['static/manifest.json', /"id": "[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}"/], // 正确的 UUID
      ['static/manifest.json', `"name": "demo"`], // demo 名字
      ['static/manifest.json', `"supportModes": ["online"]`], // 只有在线模式
    ]);
    helper.noFileContent([
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

  /**
   * JS
   * 蓝牙
   * 串口
   */
  test('js-ble-sp', () => {
    const helper = new AssertHelper();
    helper.run({
      name: 'demo',
      developFeatures: [],
      hardwareFeatures: ['ble', 'serialport', 'udp_tcp'],
    });
    helper.file([
      'package.json',
      'babel.config.js',
      'src/index.js',
      'src/devices/sp-device.js',
      'src/devices/ble-device.js',
      'udp-tcp-server/udp-tcp-server.js',
    ]);
    helper.noFile(['tsconfig.json', 'types', 'src/index.ts', 'upload-mode', '.eslintrc.js']);
    helper.fileContent([
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
    helper.noFileContent([
      ['babel.config.js', `'@babel/preset-typescript',`], // 不包含 typescript
      ['src/index.js', `import { UploadModeRegister } from './upload-mode';`], // 不包含烧录模式代码
      ['src/index.js', `UploadModeRegister,`], // 不包含烧录模式代码
    ]);
  });

  /**
   * JS
   * 蓝牙
   * 串口
   * TCP/UDP
   * 烧录
   * custom-ui
   * eslint
   */
  test('js-enable-uploadmode-ble-sp-tcp-eslint', () => {
    const helper = new AssertHelper();
    helper.run({
      name: 'demo',
      developFeatures: ['eslint'],
      hardwareFeatures: ['uploadmode', 'ble', 'serialport', 'udp_tcp', 'custom_ui'],
    });
    helper.file([
      'package.json',
      'babel.config.js',
      'src/index.js',
      'src/devices/sp-device.js',
      'src/devices/ble-device.js',
      'src/upload-mode/uploader.js',
      'src/upload-mode/uploader.js',
      '.eslintrc.js',
      'udp-tcp-server/udp-tcp-server.js',
      'src/components/example.jsx',
    ]);
    helper.noFile(['tsconfig.json', 'types', 'src/index.ts']);
    helper.fileContent([
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
      ['src/index.js', `import { DemoComp } from './components/example';`], // 包含自定义UI代码
    ]);
    helper.fileContent([
      ['babel.config.js', `'@babel/preset-react',`], // 包含 react
    ]);
    helper.noFileContent([
      ['babel.config.js', `'@babel/preset-typescript',`], // 不包含 typescript
    ]);
  });
});
