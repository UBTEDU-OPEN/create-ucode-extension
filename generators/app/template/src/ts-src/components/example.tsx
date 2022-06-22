import React from 'react';
import { UCodeExternalHardwareDefinition } from '@ubtech/ucode-extension-common-sdk/types';

export const DemoComp: UCodeExternalHardwareDefinition.ReactComponent = (props) => {
  console.log(props.getDevice());
  return (
    <h1>
      我是一个 React Hook 组件 MenuId: {props.menuId}, 设备类型: {props.getDevice()?.deviceType?.name}
    </h1>
  );
};
