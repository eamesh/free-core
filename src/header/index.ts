import { CoreWidget } from 'free-layout/core/src/interface';
import { markRaw } from 'vue';
import FreeHeader from './src/Header';
import { Window20Regular } from '@vicons/fluent';

export const FreeHeaderWidget: CoreWidget = {
  name: '顶部导航',
  key: 'free-header',
  icon: markRaw(Window20Regular),
  component: markRaw(FreeHeader),
  show: true,
  render: true
};

export default FreeHeaderWidget;
