import { Widget } from '../core/src/interface';
import { markRaw } from 'vue';
import WhiteHeight, { WhiteHeightProps } from './src/WhiteHeight';
import Thumb from './assets/thumb.png';

export const FreeWhiteHeightWidget: Widget<WhiteHeightProps> = {
  name: '辅助空白',
  key: 'white-height',
  allowCount: 50,
  thumb: Thumb,
  component: markRaw(WhiteHeight),
  data: {
    type: 'empty',
    empty: {
      height: 30
    },
    line: {
      style: 'solid',
      paddingX: 0,
      color: '#e5e5e5'
    }
  }
};

export default FreeWhiteHeightWidget;
