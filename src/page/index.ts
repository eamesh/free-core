import { CoreWidget } from '../core/src/interface';
import { Window24Regular } from '@vicons/fluent';
import { markRaw } from 'vue';
import FreePage, { FreePageProps } from './src/Page';

export const DEFAULT_COLOR = '#f7f8fa';

export const FreePageWidget: CoreWidget<FreePageProps> = {
  name: '页面设置',
  key: 'free-page',
  component: markRaw(FreePage),
  icon: markRaw(Window24Regular),
  show: true,
  render: false,
  data: {
    title: '微页面标题',
    description: '',
    backgroundColor: DEFAULT_COLOR,
    backgroundColorMode: 'default'
  }
};

export default FreePageWidget;
