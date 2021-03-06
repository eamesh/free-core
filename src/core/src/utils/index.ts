import { PropType } from 'vue';
import { PageWidget } from '../interface';

const commonWidgetDataProps = <T>(defaultData: T) => (
  {
    widgetKey: {
      type: String,
      required: true
    },
    data: {
      type: Object as PropType<T>,
      default: () => (defaultData)
    },
    params: Object
  }
);

export const widgetDataProps = <T>(defaultData: T) => (
  {
    id: {
      type: Number,
      required: true
    },
    ...commonWidgetDataProps<T>(defaultData)
  }
);

export const fixedWidgetDataProps = commonWidgetDataProps;

// 根据page wiget树生成id
export const generatorPageWidgetId = (widgets: PageWidget<any>[]) => {
  if (widgets.length === 0) return 0;
  const sort = [...widgets].sort((prev, next) => next.id - prev.id);
  return sort.shift()!.id + 1;
};

// 拉平
export const flatten = (data: any): any[] => {
  let children: any[] = [];
  data.map((item: any) => {
    if (item.children && item.children.length) {
      children = [...children, ...item.children];
    }
    return item;
  }).concat(children.length ? flatten(children) : children);

  return children;
};
