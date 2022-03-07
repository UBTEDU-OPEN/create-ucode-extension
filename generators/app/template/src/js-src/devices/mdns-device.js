import { CommonProtocols } from '@ubtech/ucode-extension-common-sdk';
import { WebsocketDevice } from './websocket-device';

const { getMdnsDeviceRegister } = CommonProtocols.MDNS;

export const WebsocketRegister = getMdnsDeviceRegister({
  DeviceConnection: WebsocketDevice,
  Options: {
    serviceNames: [
      // mdns服务名，不支持模糊匹配
      'xxxx',
    ],
    maxListeners: 1, // 最大监听数，防止重复监听
    timeoutMs: 30 * 1000, // 扫描超时时长
    deviceNameDecorations: {
      regexp: /^(\w*_)/, // 将下划线前缀去掉
      replacement: '',
    },
  },
});
