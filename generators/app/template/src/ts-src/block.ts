import { WebsocketDevice } from './devices/websocket-device';

export class ExampleDeviceExtension {
  getInfo() {
    return {
      name: '案例硬件',
      blocks: [
        {
          opcode: 'test-send',
          blockType: self.UCode.BlockType.COMMAND,
          arguments: {
            TEXT: {
              type: self.UCode.ArgumentType.STRING,
              defaultValue: 'hello',
            },
          },
          text: '发送消息: [TEXT]',
          func: 'testSendMsg',
        },
        {
          opcode: 'test-receive',
          blockType: self.UCode.BlockType.REPORTER,
          arguments: {
            TEXT: {
              type: self.UCode.ArgumentType.STRING,
              defaultValue: 'hello',
            },
          },
          text: '接收消息: [TEXT]',
          func: 'testReceiveMsg',
        },
      ],
    };
  }

  testDeviceMsg(args: { [key: string]: any }, util: { targetId: string }): Promise<void> {
    return new Promise((resolve, reject) => {
      const device = self.UCode.extensions.getDevice<WebsocketDevice>(util.targetId);
      console.log('Device', device, util);
      if (!device?.isConnected()) {
        console.log('Device 硬件没有连接');
        reject();
      } else {
        console.log('test-send', args.TEXT);
        device?.sendMsg(args.TEXT);
        resolve();
      }
    });
  }

  testReceiveMsg(args: { [key: string]: any }, util: { targetId: string }): Promise<string> {
    return new Promise((resolve, reject) => {
      const device = self.UCode.extensions.getDevice<WebsocketDevice>(util.targetId);
      console.log('Device', device, util);
      if (!device?.isConnected()) {
        console.log('Device 硬件没有连接');
        reject();
      } else {
        console.log('test-receive', args.TEXT);
        device
          .sendAndWait(args.TEXT)
          .then((data) => resolve(data as string))
          .catch(reject);
      }
    });
  }
}
