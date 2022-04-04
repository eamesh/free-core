import { PropType } from 'vue';

export const widgetDataProps = <T>(defaultData: T) => (
  {
    data: {
      type: Object as PropType<T>,
      default: () => (defaultData)
    }
  }
);
