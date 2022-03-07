import { UCodeLinkAPI } from '@ubtech/ucode-extension-common-sdk';
import { ExampleDeviceExtension } from './block';
import { bleRegister } from './devices/ble-device';
import { spRegister } from './devices/sp-device';
import { WebsocketRegister } from './devices/websocket-device';
<%_ if (isSupportUploadMode) { _%>
import { UploadModeRegister } from './upload-mode';
<%_ } _%>
const { injectRpcClient } = UCodeLinkAPI;

console.log('初始化硬件插件', "<%= name %>");

injectRpcClient();

const register = {
  DeviceRegister: [bleRegister, spRegister, WebsocketRegister],
  BlockRegister: ExampleDeviceExtension,
<%_ if (isSupportUploadMode) { _%>
  UploadModeRegister,
<%_ } _%>
};

/**
 * 调用 Worker 全局变量 self.UCode 注册
 */
self.UCode.extensions.register(register);
