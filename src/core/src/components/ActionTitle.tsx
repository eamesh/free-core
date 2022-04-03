import { NH3 } from 'naive-ui';
import { defineComponent } from 'vue';

const actionTitleProps = {
  title: String
};

export default defineComponent({
  name: 'FreeActionTitle',

  props: actionTitleProps,

  render () {
    const {
      title
    } = this;

    return (
      <div class='free-action-title'>
        <NH3 style={{ margin: 0 }}>{title}</NH3>
      </div>
    );
  }
});
