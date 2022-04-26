import { UCodeLinkAPI } from '@ubtech/ucode-extension-common-sdk';
import { ExampleDeviceExtension } from './block';
<%_ if (hardwareFeatures.includes('ble')) { _%>
import { bleRegister } from './devices/ble-device';
<%_ } _%>
<%_ if (hardwareFeatures.includes('serialport')) { _%>
import { spRegister } from './devices/sp-device';
<%_ } _%>
<%_ if (hardwareFeatures.includes('udp_tcp')) { _%>
import { tcpRegister } from './devices/udp-tcp-device';
<%_ } _%>
import { WebsocketRegister } from './devices/websocket-device';
<%_ if (hardwareFeatures.includes('uploadmode')) { _%>
import { UploadModeRegister } from './upload-mode';
<%_ } _%>
<%_ if (hardwareFeatures.includes('custom_ui')) { _%>
import { DemoComp } from './components/example';
<%_ } _%>

const { injectRpcClient } = UCodeLinkAPI;

console.log('初始化硬件插件', "<%= name %>");

injectRpcClient();

/**
 * 调用 Worker 全局变量 self.UCode 注册
 */
self.UCode.extensions.register({
    DeviceRegister: [
  <%_ if (hardwareFeatures.includes('ble')) { _%>
      bleRegister,
  <%_ } _%>
  <%_ if (hardwareFeatures.includes('serialport')) { _%>
      spRegister,
  <%_ } _%>
  <%_ if (hardwareFeatures.includes('udp_tcp')) { _%>
      tcpRegister,
  <%_ } _%>
      WebsocketRegister,
    ],
    BlockRegister: ExampleDeviceExtension,
  <%_ if (hardwareFeatures.includes('uploadmode')) { _%>
    UploadModeRegister,
  <%_ } _%>
  <%_ if (hardwareFeatures.includes('custom_ui')) { _%>
    SettingMenuRegister: {
      myMenu: {
        name: '我的组件',
        icon: '',
        type: 'component',
        component: DemoComp,
        additionalData: {
          title: '我的组件',
        },
      },
    },
  <%_ } _%>
  });
