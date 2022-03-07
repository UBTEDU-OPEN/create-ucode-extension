export class WebsocketDevice {
  constructor(injectArgs) {
    this.ws = undefined;
    this.connectStatus = self.UCode.Constant.ConnectStatus.Disconnected;
    this.eventbus = injectArgs.eventbus;
  }

  send(msg) {
    this.ws?.send(msg);
  }

  isConnected() {
    return this.connectStatus === self.UCode.Constant.ConnectStatus.Connected;
  }
  connect(device) {
    console.log('worker demo connect device ');
    return new Promise((resolve, reject) => {
      const ip = device ? device.id : 'localhost';
      this.ws = new WebSocket(`ws://${ip}:8800`);
      this.ws.onopen = () => resolve();
      this.ws.onclose = () => {
        console.log('ws close');
        this.eventbus.dispatchDisconnect();
        this.connectStatus = false;
      };
      this.ws.onerror = (error) => {
        this.eventbus.dispatchDisconnect();
        reject();
      };
    });
  }

  disconnect() {
    this.ws?.close();
    this.eventbus.dispatchDisconnect();
    return Promise.resolve();
  }

  say(msg) {
    console.log('say', msg);
    this.send(msg);
  }

  destroy() {
    this.ws?.close();
  }
}

export const WebsocketRegister = {
  DeviceType: {
    id: 'websocket',
    name: 'socket连接',
  },
  DeviceConnection: WebsocketDevice,
};
