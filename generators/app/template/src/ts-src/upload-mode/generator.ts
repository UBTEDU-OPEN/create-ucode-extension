import { GeneratorDefinition } from '@ubtech/ucode-extension-common-sdk/types';

export const DemoCustomBlockGenerators: { [key: string]: GeneratorDefinition.BlockGenerator } = {
  'test-device': {
    toCode(args: { [key: string]: any }) {
      return `testDeviceMsg(${args.TEXT})\n`;
    },
  },
};
