import { defineComponent, nextTick, unref, watch } from 'vue';
import { useFree } from '../hooks/free';

export default defineComponent({
  name: 'FreeAction',

  setup () {
    const {
      pageContentRef,
      currentPageIdRef,
      widgetsRefs,
      renderAction
    } = useFree();

    watch(
      () => currentPageIdRef.value,
      () => {
        nextTick(() => {
          console.log(widgetsRefs.value[currentPageIdRef.value!], currentPageIdRef.value);

          const currentDomRef: null | any = currentPageIdRef.value !== undefined ? widgetsRefs.value[currentPageIdRef.value!] : null;
          // 渲染Action
          renderAction.value = currentDomRef ? currentDomRef.renderAction : null;
          // 处理滚动条
          console.log(currentDomRef);
          currentDomRef && handleScrollTo(currentDomRef.$el.getBoundingClientRect());
        });
      },
      {
        deep: true
      }
    );

    // 滚动条动画
    function handleScrollTo (childRect: DOMRect) {
      const pageContent = unref(pageContentRef);
      const pageContentRect = (pageContent.$el as HTMLElement).getBoundingClientRect();

      // 获取当前视口高度
      const height = document.documentElement.clientHeight || document.body.clientHeight;

      childRect.top > height && pageContent.scrollTo({
        top: pageContentRect.height,
        behavior: 'smooth'
      });
    }

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
