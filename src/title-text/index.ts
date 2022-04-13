import { Widget } from '../core/src/interface';
import { markRaw } from 'vue';
import TitleText, { TitleTextProps } from './src/TitleText';
import Thumb from './assets/thumb.png';

export const FreeTitleTextWidget: Widget<TitleTextProps> = {
  name: '标题文本',
  key: 'title-text',
  allowCount: 50,
  thumb: Thumb,
  component: markRaw(TitleText),
  data: {
    bottomDivider: false,
    style: {
      backgroundColor: '#fff'
    },
    title: {
      text: '',
      aligin: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#323233'
      }
    },
    description: {
      text: '',
      style: {
        fontSize: '12px',
        fontWeight: '400',
        color: '#969799'
      }
    }
  }
};

export default FreeTitleTextWidget;
