const AssertHelper = require('./lib/helper');

describe('test', () => {
  test('hello', () => {
    const helper = new AssertHelper();
    helper.run({
      name: 'demo',
      developFeatures: [],
      hardwareFeatures: ['uploadmode'],
    });
    helper.file(['package.json', 'babel.config.js', 'src/index.js', 'src/upload-mode/uploader.js']);
    helper.noFile(['tsconfig.json', 'types', 'src/index.ts']);
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
    ]);
  });
});
