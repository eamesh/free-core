import { CoreWidget } from 'free-core/core/src/interface';
import { PanelSeparateWindow20Regular } from '@vicons/fluent';
import { markRaw } from 'vue';
import FreeWidgets from './src/Widgets';

export const FreeWidgetsManageWidget: CoreWidget = {
  name: '组件管理',
  key: 'free-widgets',
  component: markRaw(FreeWidgets),
  show: true,
  render: false,
  icon: markRaw(PanelSeparateWindow20Regular)
};

export default FreeWidgetsManageWidget;
