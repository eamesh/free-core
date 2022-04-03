import { defineComponent, nextTick, watch } from 'vue';
import { useFree } from '../hooks/free';

export default defineComponent({
  name: 'FreeAction',

  setup () {
    const {
      currentPageIdRef,
      widgetsRefs,
      renderAction
    } = useFree();

    watch(
      () => currentPageIdRef.value,
      () => {
        nextTick(() => {
          console.log(widgetsRefs.value[currentPageIdRef.value!], currentPageIdRef.value);
          renderAction.value = currentPageIdRef.value !== undefined ? (widgetsRefs.value[currentPageIdRef.value!] as any).renderAction : null;
        });
      },
      {
        deep: true
      }
    );

    return {
      renderAction
    };
  },

  render () {
    const {
      renderAction
    } = this;
    return (
      <>
        {renderAction ? <renderAction /> : null}
      </>
    );
  }
});
