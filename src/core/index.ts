import FreeLayout from './src/Layout';
import _Free from './free';
import FreeActionTitle from './src/components/ActionTitle';
import { FreeHeaderWidget } from '../header';
import { FreeFooterWidget } from '../footer';
import { FreePageWidget } from '../page';
import { FreeWidgetsManageWidget } from '../widgets';

export const Free = new _Free();

// 挂载顶部和底部
Free.header = FreeHeaderWidget;
Free.footer = FreeFooterWidget;
Free.core = [
  FreePageWidget,
  FreeWidgetsManageWidget
];

// type WidgetKeySchema<T> = {
//   key: T;
//   [key: string]: any;
// }

// function defineWidgets<T extends string> (configs: Array<WidgetKeySchema<T>>) {
//   return configs;
// }

// const coreWidgets = defineWidgets(Free.core);

// export type DefaultCoreWidgetKeys = typeof coreWidgets[number]['key']

export {
  FreeLayout,
  FreeActionTitle
};
