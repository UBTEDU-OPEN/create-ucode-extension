/**
 * 示例 硬件连接
 */

import {
  DeviceRegisterType,
  DeviceConnectionInterface,
  HardwareDeviceConstructorArgumentType,
  DeviceEventbusInterface,
  UCode,
  DeviceType,
} from '@ubtech/ucode-extension-common-sdk/types';

export class WebsocketDevice implements DeviceConnectionInterface {
  private ws?: WebSocket;

  public eventbus: DeviceEventbusInterface;

  public connectStatus: UCode.DeviceConnectStatusUnionType = self.UCode.Constant.ConnectStatus.Disconnected;

  deviceType?: DeviceType | undefined;

  constructor(injectArgs: HardwareDeviceConstructorArgumentType) {
    this.eventbus = injectArgs.eventbus;
    this.deviceType = injectArgs.deviceType;
  }

  /**
   * 发送消息
   * @param {string | Object} data
   */
  sendMsg(msg: string) {
    this.ws?.send(msg);
  }

  /**
   * 当接收到消息后, 会调用该方法
   * @param {string} data
   */
  receiveMsg(data: string) {
    console.log(data);
  }

  /**
   * 发送并等待, 适合一问一答的协议类型
   * @param {string} data
   * @param {number} timeout
   * @returns {Promise<string>}
   */
  sendAndWait(data: string, timeout = 3000) {
    return new Promise((resolve, reject) => {
      const timeoutDispose = setTimeout(() => {
        // 超时处理
        disposeObj.dispose?.();
        reject(new Error('timeout'));
      }, timeout);
      const disposeObj = this.onData((evt) => {
        // 监听消息会返回一个 dispose
        const msg = evt.data;
        console.log('receive msg', msg, typeof msg);
        clearTimeout(timeoutDispose); // 清空 timeout
        disposeObj.dispose?.(); // 收到想要的消息, 清理掉事件
        resolve(msg); // 返回消息
      });
      this.sendMsg(data);
    });
  }

  onData(listener: (data: any) => void) {
    this.ws?.addEventListener('message', listener);
    return {
      dispose: () => this.ws?.removeEventListener('message', listener),
    };
  }

  isConnected() {
    return this.connectStatus === self.UCode.Constant.ConnectStatus.Connected;
  }

  /**
   * 连接设备
   * @returns {Promise<void>}
   */
  connect(): Promise<void> {
    console.log('worker demo connect device ');
    return new Promise((resolve, reject) => {
      const ip = 'localhost';
      this.ws = new WebSocket(`ws://${ip}:8800`);
      this.ws.onopen = () => resolve();
      this.ws.onclose = () => {
        console.log('ws close');
        this.eventbus.dispatchDisconnect();
        this.connectStatus = self.UCode.Constant.ConnectStatus.Disconnected;
      };
      this.ws.onerror = (error) => {
        this.eventbus.dispatchDisconnect();
        reject();
      };
      this.ws.onmessage = (ev) => {
        this.receiveMsg(ev.data);
      };
    });
  }

  disconnect() {
    this.ws?.close();
    this.eventbus.dispatchDisconnect();
    return Promise.resolve();
  }

  /**
   * 设备销毁
   */
  destroy() {
    this.disconnect();
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
