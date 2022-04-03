import { CoreWidget } from 'free-core/core/src/interface';
import { Window24Regular } from '@vicons/fluent';
import { markRaw } from 'vue';
import FreePage from './src/Page';

export const FreePageWidget: CoreWidget = {
  name: '页面设置',
  key: 'free-page',
  component: markRaw(FreePage),
  icon: markRaw(Window24Regular),
  show: true,
  render: false
};

export default FreePageWidget;
