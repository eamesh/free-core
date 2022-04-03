import { CoreWidget } from 'free-core/core/src/interface';
import { markRaw } from 'vue';
import FreeFooter from './src/Footer';

export const FreeFooterWidget: CoreWidget = {
  name: '底部占位',
  key: 'free-footer',
  component: markRaw(FreeFooter),
  show: false,
  render: true
};

export default FreeFooterWidget;
