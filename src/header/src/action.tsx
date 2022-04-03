import { FreeActionTitle } from '../../core';
import { NA } from 'naive-ui';

export function useAction () {
  // 渲染表单操作
  function renderAction () {
    return (
      <>
        <FreeActionTitle title='顶部导航' />
        <div class='free-action-form'>
          <NA>功能待完善</NA>
        </div>
      </>
    );
  }

  return {
    renderAction
  };
}
