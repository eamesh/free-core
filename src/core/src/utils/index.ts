import { PropType } from 'vue';
import { PageWidget } from '../interface';

export const widgetDataProps = <T>(defaultData: T) => (
  {
    id: {
      type: Number,
      required: true
    },
    widgetKey: {
      type: String,
      required: true
    },
    data: {
      type: Object as PropType<T>,
      default: () => (defaultData)
    }
  }
);

export const fixedWidgetDataProps = <T>(defaultData: T) => (
  {
    widgetKey: {
      type: String,
      required: true
    },
    data: {
      type: Object as PropType<T>,
      default: () => (defaultData)
    }
  }
);

// 根据page wiget树生成id
export const generatorPageWidgetId = (widgets: PageWidget<any>[]) => {
  if (widgets.length === 0) return 0;
  const sort = [...widgets].sort((prev, next) => next.id - prev.id);
  return sort.shift()!.id + 1;
};
