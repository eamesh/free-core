import { WidgetNode } from '../interface';
import { useFree } from './free';

export function useAction () {
  const {
    renderAction
  } = useFree();

  function handleSetRenderAction (component: WidgetNode) {
    setTimeout(() => {
      renderAction.value = component;
    });
  }

  return {
    renderAction,
    handleSetRenderAction
  };
}
