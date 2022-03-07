import { CommonProtocols } from '@ubtech/ucode-extension-common-sdk';

const { SerialPortProtocol, getSerialPortDeviceRegister } = CommonProtocols.SerialPort;

class DemoSerialPortDevice extends SerialPortProtocol {
  say(data: string) {
    this.send(Buffer.from(data));
  }
}

export const spRegister = getSerialPortDeviceRegister({
  DeviceConnection: DemoSerialPortDevice,
  // 以下配置均为可选配置
  Options: {
    openOptions: {
      baudRate: 115200, // 串口打开的波特率
      bufferSize: 12 * 1024 * 1024, // 缓冲区大小
    },
    queueOptions: {
      enable: true, // 数据发送是否启用队列
      interval: 70, // 启用队列时数据发送的间隔
    },
    // 发现设备时过滤用的vid和pid,配置后将只显示和配置id一致的串口设备
    filter: {
      vid: '0403',
      pid: '6001',
    },
    // 自定义显示串口设备名
    customDeviceName: (data) => `myRobot_${data?.comName}`,
  },
});
