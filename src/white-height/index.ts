import { Widget } from 'free-core/core/src/interface';
import { markRaw } from 'vue';
import WhiteHeight from './src/WhiteHeight';
import Thumb from './assets/thumb.png';

export const FreeWhiteHeightWidget: Widget = {
  name: '辅助空白',
  key: 'white-height',
  allowCount: 10,
  thumb: Thumb,
  component: markRaw(WhiteHeight)
};

export default FreeWhiteHeightWidget;
