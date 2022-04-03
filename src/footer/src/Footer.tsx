import { NText } from 'naive-ui';
import { defineComponent } from 'vue';

import './style.scss';

export default defineComponent({
  name: 'FreeFooter',

  setup () {

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
