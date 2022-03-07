import {
  DeviceRegisterType,
  DeviceConnectionInterface,
  HardwareDeviceConstructorArgumentType,
  DeviceEventbusInterface,
  UCode,
} from '@ubtech/ucode-extension-common-sdk/types';

export class WebsocketDevice implements DeviceConnectionInterface {
  private ws?: WebSocket;

  public eventbus: DeviceEventbusInterface;

  public connectStatus: UCode.DeviceConnectStatusUnionType = self.UCode.Constant.ConnectStatus.Disconnected;

  constructor(injectArgs: HardwareDeviceConstructorArgumentType) {
    this.eventbus = injectArgs.eventbus;
  }

  send(msg: string) {
    this.ws?.send(msg);
  }

  isConnected() {
    return this.connectStatus === self.UCode.Constant.ConnectStatus.Connected;
  }
  connect(): Promise<void> {
    console.log('worker demo connect device ');
    return new Promise((resolve, reject) => {
      const ip = 'localhost';
      this.ws = new WebSocket(`ws://${ip}:8800`);
      this.ws.onopen = () => resolve();
      this.ws.onclose = () => {
        console.log('ws close');
        this.eventbus?.dispatchDisconnect();
        this.connectStatus = self.UCode.Constant.ConnectStatus.Disconnected;
      };
      this.ws.onerror = (error) => {
        this.eventbus?.dispatchDisconnect();
        reject();
      };
    });
  }

  disconnect() {
    this.ws?.close();
    this.eventbus.dispatchDisconnect();
    return Promise.resolve();
  }

  say(msg: string) {
    console.log('say', msg);
    this.send(msg);
  }

  destroy() {
    this.ws?.close();
    return Promise.resolve();
  }
}

export const WebsocketRegister: DeviceRegisterType = {
  DeviceType: {
    id: 'websocket',
    name: 'socket连接',
  },
  DeviceConnection: WebsocketDevice,
};
