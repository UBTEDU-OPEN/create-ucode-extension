import { ExtensionUI } from '@ubtech/ucode-extension-common-sdk';
import type { UCodeExternalHardwareDefinition } from '@ubtech/ucode-extension-common-sdk/types';
import { WebsocketDevice } from './devices/websocket-device';

const { Toast } = ExtensionUI;

export class ExampleDeviceExtension {
  getInfo(): UCodeExternalHardwareDefinition.GetInfo | UCodeExternalHardwareDefinition.GetInfo[] {
    return [
      {
        // category-1
        name: '发送',
        color1: '#0FBD8C',
        color2: '#0DA57A',
        color3: '#0B8E69',
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
        ],
      },
      {
        // category-2
        name: '接收',
        color1: '#0FBD8C',
        color2: '#0DA57A',
        color3: '#0B8E69',
        blocks: [
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
      },
    ];
  }

  testSendMsg(args: { [key: string]: any }, util: { targetId: string }): Promise<void> {
    return new Promise((resolve) => {
      const device = self.UCode.extensions.getDevice<WebsocketDevice>(util.targetId);
      console.log('Device', device, util);
      if (!device?.isConnected()) {
        console.log('Device 硬件没有连接');
        Toast('Device 硬件没有连接');
      } else {
        console.log('test-send', args.TEXT);
        device?.sendMsg(args.TEXT);
      }
      resolve(); // 积木块程序运行结束，避免使用reject。
    });
  }

  testReceiveMsg(args: { [key: string]: any }, util: { targetId: string }): Promise<string> {
    return new Promise((resolve) => {
      const device = self.UCode.extensions.getDevice<WebsocketDevice>(util.targetId);
      console.log('Device', device, util);
      if (!device?.isConnected()) {
        console.log('Device 硬件没有连接');
        Toast('Device 硬件没有连接');
        resolve(''); // 积木块程序运行结束，未连接返回空
      } else {
        console.log('test-receive', args.TEXT);
        device
          .sendAndWait(args.TEXT)
          .then((data) => resolve(data as string)) // 积木块程序运行结束，返回数据
          .catch(() => resolve('')); // 积木块程序运行结束，出错时返回空
      }
    });
  }
}
