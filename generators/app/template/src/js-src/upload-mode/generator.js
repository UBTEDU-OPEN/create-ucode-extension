export const DemoCustomGenerators = {
  'test-device': {
    toCode(args) {
      return `testDeviceMsg(${args.TEXT})\n`;
    },
  },
};
