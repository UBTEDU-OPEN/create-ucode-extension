import { CommonProtocols } from '@ubtech/ucode-extension-common-sdk';

const { UCodeBleProtocol, getUCodeBleDeviceRegister } = CommonProtocols.BLE;

class DemoWebbleDevice extends UCodeBleProtocol {
  say(data: string) {
    this.send(Buffer.from(data));
  }
}

export const bleRegister = getUCodeBleDeviceRegister({
  DeviceConnection: DemoWebbleDevice,
  Options: {
    services: {
      serviceUUID: '55425401-ff00-1000-8000-00805f9b34fb', // ble 的服务 id
      characteristics: [
        {
          name: 'read',
          uuid: '55425403-ff00-1000-8000-00805f9b34fb', // notify 的特征id
          readable: true,
        },
        {
          name: 'write',
          uuid: '55425402-ff00-1000-8000-00805f9b34fb', // 写数据的特征id
        },
      ],
    },
    defaultWriteCharacteristicUUID: '55425402-ff00-1000-8000-00805f9b34fb', // 默认写的特征id
    filters: [{ namePrefix: 'uKit' }], // 过滤字符，配置后发现设备时将只显示该字符开头的蓝牙设备
    queueOptions: {
      enable: true, // 数据发送是否启用队列
      interval: 150, // 启用队列时数据发送的间隔
    },
  },
});
