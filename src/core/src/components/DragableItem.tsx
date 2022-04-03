import { computed, defineComponent, PropType } from 'vue';
import { NIcon, NSpace, NTooltip } from 'naive-ui';
import { ArrowCircleDown16Regular, ArrowCircleUp16Regular, Copy16Regular, Delete16Regular, WindowEdit16Regular } from '@vicons/fluent';
import { PageWidget } from '../interface';
import { useFree } from '../hooks/free';
import { usePage } from '../hooks/page';
import { useAside } from '../hooks/aside';

const dragableItemProps = {
  info: {
    type: Object as PropType<PageWidget>,
    required: true
  }
};

export default defineComponent({
  name: 'FreeDragableItem',

  props: dragableItemProps,

  setup (props) {
    const {
      pageWidgetsRef,
      currentPageIdRef
    } = useFree();

    const {
      flattenAsidesCompute
    } = useAside();

    const {
      handleSetCurrentPageId,
      currentPageWidgetIndex,
      currentPageWidget,
      handleAddPageWidget,
      handelDeleteCurrentWidget
    } = usePage();

    // 是否焦点
    const activeCompute = computed(() => {
      return currentPageIdRef.value === props.info?.id;
    });

    // 上移
    function handleUp (e: MouseEvent) {
      e.preventDefault();
      console.log('up');
      const moveToIndex = currentPageWidgetIndex.value - 1 < 0 ? 0 : currentPageWidgetIndex.value - 1;
      [
        pageWidgetsRef.value[currentPageWidgetIndex.value],
        pageWidgetsRef.value[moveToIndex]] =
        [
          pageWidgetsRef.value[moveToIndex],
          pageWidgetsRef.value[currentPageWidgetIndex.value]
        ];
    }

    // 下移
    function handleDown (e: MouseEvent) {
      e.preventDefault();
      console.log('down');
      const moveToIndex = currentPageWidgetIndex.value + 1 >= pageWidgetsRef.value.length ? currentPageWidgetIndex.value : currentPageWidgetIndex.value + 1;
      [
        pageWidgetsRef.value[currentPageWidgetIndex.value],
        pageWidgetsRef.value[moveToIndex]] =
        [
          pageWidgetsRef.value[moveToIndex],
          pageWidgetsRef.value[currentPageWidgetIndex.value]
        ];
    }

    // 复制
    function handleCopy (e: MouseEvent) {
      e.preventDefault();
      console.log('copy');

      // 一维组件集合获取Widget 并添加
      const widget = flattenAsidesCompute.value.find(item => item.key === currentPageWidget.value?.key);
      handleAddPageWidget(widget);
    }

    // 备注
    function handleRemark (e: MouseEvent) {
      e.preventDefault();
      console.log('remark');
    }

    // 删除
    function handleDelete (e: MouseEvent) {
      e.preventDefault();
      console.log('delete');
      handelDeleteCurrentWidget();
    }

    return {
      currentPageId: currentPageIdRef,
      active: activeCompute,
      handleSetCurrentPageId,
      handleUp,
      handleDown,
      handleCopy,
      handleRemark,
      handleDelete
    };
  },

  render () {
    const {
      info,
      $slots,
      active,
      handleSetCurrentPageId,
      handleUp,
      handleDown,
      handleCopy,
      handleRemark,
      handleDelete
    } = this;

    return (
      <div
        class={[
          'com-item',
          {
            active
          }
        ]}
        onClick={() => handleSetCurrentPageId(info!.id)}
      >
        {$slots.default ? $slots.default() : null}
        <div class='com-widget'>
          <div class='tooltip'>
            { info?.name }
          </div>
        </div>
        {
          active
            ? (
                <div class='com-operate' onClick={(e: MouseEvent) => e.stopPropagation()}>
                  <NSpace size={0} vertical align='center'>
                    <NTooltip placement='right'>
                      {{
                        trigger: () => (
                          <NIcon {...{
                            onClick: handleUp
                          }}>
                            <ArrowCircleUp16Regular />
                          </NIcon>
                        ),
                        default: () => '向上移动'
                      }}
                    </NTooltip>
                    <NTooltip placement='right'>
                      {{
                        trigger: () => (
                          <NIcon {...{
                            onClick: handleDown
                          }}>
                            <ArrowCircleDown16Regular />
                          </NIcon>
                        ),
                        default: () => '向下移动'
                      }}
                    </NTooltip>
                    <NTooltip placement='right'>
                      {{
                        trigger: () => (
                          <NIcon {...{
                            onClick: handleCopy
                          }}>
                            <Copy16Regular />
                          </NIcon>
                        ),
                        default: () => '复制'
                      }}
                    </NTooltip>
                    <NTooltip placement='right'>
                      {{
                        trigger: () => (
                          <NIcon {...{
                            onClick: handleRemark
                          }}>
                            <WindowEdit16Regular />
                          </NIcon>
                        ),
                        default: () => '备注(comming soon)'
                      }}
                    </NTooltip>
                    <NTooltip placement='right'>
                      {{
                        trigger: () => (
                          <NIcon {...{
                            onClick: handleDelete
                          }}>
                            <Delete16Regular />
                          </NIcon>
                        ),
                        default: () => '删除'
                      }}
                    </NTooltip>
                  </NSpace>
                </div>
              )
            : null
        }
      </div>
    );
  }
});
