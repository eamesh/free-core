import { fixedWidgetDataProps } from 'free-core/core/src/utils';
import { NText } from 'naive-ui';
import { defineComponent, ref } from 'vue';

import './style.scss';

export default defineComponent({
  name: 'FreeFooter',

  props: fixedWidgetDataProps({}),

  setup () {
    const model = ref({});

    return {
      model
    };
  },

  render () {
    return (
      <div class='free-footer'>
        <div class='copyright'>
          <NText depth={3}>太年轻</NText>
          <NText depth={3}>easeava@gmail.com</NText>
        </div>
      </div>
    );
  }
});
