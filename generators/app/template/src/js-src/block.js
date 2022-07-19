import { ExtensionUI } from '@ubtech/ucode-extension-common-sdk';
<%_ if (hardwareFeatures.includes('i18n')) { _%>
import Messages from './message';
<%_ } _%>

const { Toast } = ExtensionUI;

export class ExampleDeviceExtension {
  getInfo() {
    return [
      {
<%_ if (hardwareFeatures.includes('i18n')) { _%>
        name: Messages.SendCategoryName,
<%_ } else { _%>
        name: '发送',
<%_ } _%>
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
<%_ if (hardwareFeatures.includes('i18n')) { _%>
            text: Messages.TestSendBlock,
<%_ } else { _%>
            text: '发送消息: [TEXT]',
<%_ } _%>
            func: 'testSendMsg',
          },
        ],
      },
      {
<%_ if (hardwareFeatures.includes('i18n')) { _%>
        name: Messages.ReceiveCategoryName,
<%_ } else { _%>
        name: '接收',
<%_ } _%>
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
<%_ if (hardwareFeatures.includes('i18n')) { _%>
            text: Messages.TestReceiveBlock,
<%_ } else { _%>
            text: '接收消息: [TEXT]',
<%_ } _%>
            func: 'testReceiveMsg',
          },
        ],
      },
    ];
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
        device
          .sendAndWait(args.TEXT)
          .then((data) => resolve(data))
          .catch(() => resolve(''));
      }
    });
  }
}
