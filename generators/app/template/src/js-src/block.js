import { ExtensionUI } from "@ubtech/ucode-extension-common-sdk";

const { Toast } = ExtensionUI;

export class ExampleDeviceExtension {
  getInfo() {
    return [{
      name: '发送',
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
    }, {
      name: '接收',
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
    }];
  }

  testSendMsg(args, util) {
    return new Promise((resolve) => {
      const device = self.UCode.extensions.getDevice(util.targetId);
      console.log('Device', device, util);
      if (!device?.isConnected()) {
        console.log('Device 硬件没有连接');
        Toast('Device 硬件没有连接');
      } else {
        console.log('test-send', args.TEXT);
        device?.sendMsg(args.TEXT);
      }
      resolve();
    });
  }

  testReceiveMsg(args, util) {
    return new Promise((resolve, reject) => {
      const device = self.UCode.extensions.getDevice(util.targetId);
      console.log('Device', device, util);
      if (!device?.isConnected()) {
        console.log('Device 硬件没有连接');
        Toast('Device 硬件没有连接');
        resolve('');
      } else {
        console.log('test-receive', args.TEXT);
        device.sendAndWait(args.TEXT)
          .then((data) => resolve(data))
          .catch(() => resolve(''));
      }
    });
  }
}
