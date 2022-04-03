import { Widget } from 'free-core/core/src/interface';
import { markRaw } from 'vue';
import TitleText from './src/TitleText';
import Thumb from './assets/thumb.png';

export const FreeTitleTextWidget: Widget = {
  name: '标题文本',
  key: 'title-text',
  allowCount: 10,
  thumb: Thumb,
  component: markRaw(TitleText)
};

export default FreeTitleTextWidget;
