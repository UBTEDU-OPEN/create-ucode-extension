'use strict';
const AssertHelper = require('./lib/helper');

describe('ts-test', () => {
  /**
   * TS
   */
  test('ts-only', () => {
    const helper = new AssertHelper();
    helper.run({
      name: 'demo',
      developFeatures: ['typescript'],
      hardwareFeatures: [],
    });
    helper.file(['package.json', 'src/index.ts', 'tsconfig.json', 'types/ucode.d.ts']);
    helper.noFile([
      'src/index.js',
      'src/upload-mode/uploader.ts',
      '.eslintrc.js',
      'src/components/example.tsx',
      'src/message.ts',
      'src/message.js',
    ]);
    helper.fileContent([
      ['static/manifest.json', /"id": "[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}"/], // 正确的 UUID
      ['static/manifest.json', `"name": "demo"`], // demo 名字
      ['static/manifest.json', `"supportModes": ["online"]`], // 只有在线模式
    ]);
    helper.noFileContent([
      ['src/index.ts', `import { UploadModeRegister } from './upload-mode';`], // 不包含烧录模式代码
      ['src/index.ts', `UploadModeRegister,`], // 不包含烧录模式代码
      ['src/index.ts', `import { spRegister } from './devices/sp-device';`], // 不包含串口协议代码
      ['src/index.ts', `spRegister,`], // 不包含串口协议代码
      ['src/index.ts', `import { bleRegister } from './devices/ble-device';`], // 不包含蓝牙协议代码
      ['src/index.ts', `bleRegister,`], // 不包含蓝牙协议代码
      ['src/index.ts', `import { tcpRegister } from './devices/udp-tcp-device';`], // 不包含UDP/TCP协议代码
      ['src/index.ts', `tcpRegister,`], // 不包含UDP/TCP协议代码
      ['src/index.ts', `import { DemoComp } from './components/example';`], // 不包含自定义UI代码
      ['src/block.ts', `import Messages from './message';`], // 不包含 国际化 代码
    ]);
  });

  /**
   * TS
   * Eslint
   */
  test('enable-ts-eslint', () => {
    const helper = new AssertHelper();
    helper.run({
      name: 'demo',
      developFeatures: ['typescript', 'eslint'],
      hardwareFeatures: [],
    });
    helper.file(['package.json',  'src/index.ts', 'tsconfig.json', 'types/ucode.d.ts', '.eslintrc.js']);
    helper.noFile(['src/index.js', 'src/upload-mode/uploader.ts']);
    helper.fileContent([
      ['static/manifest.json', /"id": "[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}"/], // 正确的 UUID
      ['static/manifest.json', `"name": "demo"`], // demo 名字
      ['static/manifest.json', `"supportModes": ["online"]`], // 只有在线模式
    ]);
    helper.noFileContent([
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

  /**
   * TS
   * 蓝牙
   * 串口
   */
  test('ts-ble-sp', () => {
    const helper = new AssertHelper();
    helper.run({
      name: 'demo',
      developFeatures: ['typescript'],
      hardwareFeatures: ['ble', 'serialport', 'udp_tcp'],
    });
    helper.file([
      'package.json',
      'src/index.ts',
      'tsconfig.json',
      'types/ucode.d.ts',
      'src/devices/ble-device.ts',
      'src/devices/sp-device.ts',
    ]);
    helper.noFile(['src/index.js', '.eslintrc.js']);
    helper.fileContent([
      ['static/manifest.json', /"id": "[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}"/], // 正确的 UUID
      ['static/manifest.json', `"name": "demo"`], // demo 名字
      ['static/manifest.json', `"supportModes": ["online"]`], // 在线模式
      ['src/index.ts', `import { spRegister } from './devices/sp-device';`], // 串口协议代码
      ['src/index.ts', `spRegister,`], // 串口协议代码
      ['src/index.ts', `import { bleRegister } from './devices/ble-device';`], // 蓝牙协议代码
      ['src/index.ts', `bleRegister,`], // 蓝牙协议代码
      ['src/index.ts', `import { tcpRegister } from './devices/udp-tcp-device';`], // UDP/TCP协议代码
      ['src/index.ts', `tcpRegister,`], // UDP/TCP协议代码
    ]);
    helper.noFileContent([
      ['src/index.ts', `import { UploadModeRegister } from './upload-mode';`], // 烧录模式代码
      ['src/index.ts', `UploadModeRegister,`], // 烧录模式代码
    ]);
  });
  /**
   * TS
   * 烧录模式
   */
  test('ts-uploadmode', () => {
    const helper = new AssertHelper();
    helper.run({
      name: 'demo',
      developFeatures: ['typescript'],
      hardwareFeatures: ['uploadmode'],
    });
    helper.file([
      'package.json',
      
      'src/index.ts',
      'tsconfig.json',
      'types/ucode.d.ts',
      'src/upload-mode/uploader.ts',
    ]);
    helper.noFile(['src/index.js', '.eslintrc.js']);
    helper.fileContent([
      ['static/manifest.json', /"id": "[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}"/], // 正确的 UUID
      ['static/manifest.json', `"name": "demo"`], // demo 名字
      ['static/manifest.json', `"supportModes": ["online","upload"]`], // 在线模式 和 烧录模式
      ['src/index.ts', `import { UploadModeRegister } from './upload-mode';`], // 烧录模式代码
      ['src/index.ts', `UploadModeRegister,`], // 烧录模式代码
    ]);
    helper.noFileContent([
      ['src/index.ts', `import { spRegister } from './devices/sp-device';`], // 串口协议代码
      ['src/index.ts', `spRegister,`], // 串口协议代码
      ['src/index.ts', `import { bleRegister } from './devices/ble-device';`], // 蓝牙协议代码
      ['src/index.ts', `bleRegister,`], // 蓝牙协议代码
      ['src/index.ts', `import { tcpRegister } from './devices/udp-tcp-device';`], // UDP/TCP协议代码
      ['src/index.ts', `tcpRegister,`], // UDP/TCP协议代码
    ]);
  });
  /**
   * TS
   * 烧录模式
   * 蓝牙
   * 串口
   * TCP/UDP
   * custom-ui
   * Eslint
   */
  describe('ts-all', () => {
    const helper = new AssertHelper();
    helper.run({
      name: 'demo',
      developFeatures: ['typescript', 'eslint'],
      hardwareFeatures: ['uploadmode', 'ble', 'serialport', 'udp_tcp', 'custom_ui', 'i18n'],
    });
    helper.file([
      'package.json',
      'src/index.ts',
      'tsconfig.json',
      'types/ucode.d.ts',
      'src/devices/ble-device.ts',
      'src/devices/sp-device.ts',
      'src/upload-mode/uploader.ts',
      '.eslintrc.js',
      'src/components/example.tsx',
      'src/message.ts',
    ]);
    helper.noFile(['src/index.js']);
    helper.fileContent([
      ['static/manifest.json', /"id": "[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}"/], // 正确的 UUID
      ['static/manifest.json', `"defaultMessage": "demo"`], // demo 名字 (国际化)
      ['static/manifest.json', `"supportModes": ["online","upload"]`], // 在线模式 和 烧录模式
      ['src/index.ts', `import { UploadModeRegister } from './upload-mode';`], // 烧录模式代码
      ['src/index.ts', `UploadModeRegister,`], // 烧录模式代码
      ['src/index.ts', `import { spRegister } from './devices/sp-device';`], // 串口协议代码
      ['src/index.ts', `spRegister,`], // 串口协议代码
      ['src/index.ts', `import { bleRegister } from './devices/ble-device';`], // 蓝牙协议代码
      ['src/index.ts', `bleRegister,`], // 蓝牙协议代码
      ['src/index.ts', `import { tcpRegister } from './devices/udp-tcp-device';`], // UDP/TCP协议代码
      ['src/index.ts', `tcpRegister,`], // UDP/TCP协议代码
      ['src/index.ts', `import { DemoComp } from './components/example';`], // 包含自定义UI代码
      ['src/block.ts', `import Messages from './message';`], // 包含 国际化 代码
    ]);
    helper.noFileContent([]);
  });
});
