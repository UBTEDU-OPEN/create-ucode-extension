import { CommonProtocols } from '@ubtech/ucode-extension-common-sdk';

const { UCodeBleProtocol, getUCodeBleDeviceRegister } = CommonProtocols.BLE;

class DemoWebbleDevice extends UCodeBleProtocol {
  /**
   * 蓝牙 构造函数
   * @param {Object} args uCode 初始化的时候会注入的函数或者变量
   */
  constructor(args) {
    super(args);
    this.onData(this.receiveMsg.bind(this)); // 绑定接收消息的事件
  }

  /**
   * 发送消息
   * @param {string | Buffer} data
   */
  sendMsg(data) {
    this.send(Buffer.from(data));
  }

  /**
   * 蓝牙接收的数据体
   * @typedef {Object} CommonBleDataType
   * @property {string} uuid - 蓝牙 read 特征值的 uuid
   * @property {Buffer} data - 数据
   */

  /**
   * 当接收到消息后, 会调用该方法
   * @param {CommonBleDataType} data
   */
  receiveMsg(data) {
    console.log(data.uuid, data.data);
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
    /**
     * 可选配置
     */
    queueOptions: {
      enable: true, // 数据发送是否启用队列
      interval: 150, // 启用队列时数据发送的间隔
    },
  },
});
