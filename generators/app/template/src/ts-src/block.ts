import { WebsocketDevice } from './devices/websocket-device';

export class ExampleDeviceExtension {
  getInfo() {
    return {
      name: '案例硬件',
      blocks: [
        {
          opcode: 'test-device',
          blockType: self.UCode.BlockType.COMMAND,
          arguments: {
            TEXT: {
              type: self.UCode.ArgumentType.STRING,
              defaultValue: 'hello',
            },
          },
          text: '发送消息: [TEXT]',
          func: 'testDeviceMsg',
        },
      ],
    };
  }

  testDeviceMsg(args: { [key: string]: any }, util: { targetId: string }): Promise<void> {
    return new Promise((resolve, reject) => {
      const device = self.UCode.extensions.getDevice<WebsocketDevice>(util.targetId);
      console.log('Device', device, util);
      if (!device?.isConnected()) {
        console.log('device 硬件没有连接');
        reject();
      } else {
        console.log('test-device', args.TEXT);
        device?.say(args.TEXT);
        resolve();
      }
    });
  }
}