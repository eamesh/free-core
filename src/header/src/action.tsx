import { FreeActionTitle } from '../../core';
import { NA, NColorPicker } from 'naive-ui';
import { ref } from 'vue';

export function useAction () {
  const model = ref({
    backgroundColor: '#fff'
  });
  // 渲染表单操作
  function renderAction () {
    return (
      <>
        <FreeActionTitle title='顶部导航' />
        <div class='free-action-form'>
          <NA>背景颜色</NA>
          <NColorPicker showAlpha={false} v-model:value={model.value.backgroundColor} />
        </div>
      </>
    );
  }

  return {
    model,
    renderAction
  };
}
