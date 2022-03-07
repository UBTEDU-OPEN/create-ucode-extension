import { PythonGenerator } from '@ubtech/ucode-extension-common-sdk';
import { Uploader } from './uploader';
import { DemoCustomBlockGeneartors } from './generator';

/**
 * 代码转换器, 这里的 key 需要和 blocks 里面的对应
 */
export const UploadModeRegister = PythonGenerator.getPythonCodeGenerators({
  uploader: Uploader,
  CustomBlockGeneartors: DemoCustomBlockGeneartors,
});
