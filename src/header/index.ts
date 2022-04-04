import { CoreWidget } from '../core/src/interface';
import { markRaw } from 'vue';
import FreeHeader, { FreeHeaderProps } from './src/Header';
import { Window20Regular } from '@vicons/fluent';

export const FreeHeaderWidget: CoreWidget<FreeHeaderProps> = {
  name: '顶部导航',
  key: 'free-header',
  icon: markRaw(Window20Regular),
  component: markRaw(FreeHeader),
  show: true,
  render: true,
  data: {
    backgroundColor: '#fff'
  }
};

export default FreeHeaderWidget;
