import { NCollapse, NCollapseItem, NSpace, NText } from 'naive-ui';
import { computed, defineComponent } from 'vue';
import { Widget, AsideGroupOnId, AsideWidget } from '../interface';
import Draggable from 'vuedraggable';
import { useAside } from '../hooks/aside';
import { usePage } from '../hooks/page';
import { generatorPageWidgetId } from '../utils';

const asideProps = {
  asideGroup: {
    type: Boolean,
    default: false
  }
};

export default defineComponent({
  name: 'AsideItem',

  // components: {
  //   'n-grid': NGrid
  // },

  props: asideProps,

  setup (props) {
    const {
      widgetsUsed,
      asideWidgetsRef,
      asidesCompute,
      flattenAsidesCompute,
      handleSetAsideDragStart
    } = useAside();

    const {
      pageWidgetsRef,
      handleAddPageWidget
    } = usePage();

    const defaultExpandedAsideName = computed(() => {
      return props.asideGroup ? asideWidgetsRef.value.map(group => group.key) : [];
    });

    // 组装待添加Page数据
    function handleClone ({ id }: { id: number }) {
      console.log('clone id', id, flattenAsidesCompute.value);
      // 判断已使用个数
      const currentWidget = flattenAsidesCompute.value.find(item => item.id === id);
      if (widgetsUsed.value[currentWidget!.key] >= currentWidget!.allowCount) return;

      return {
        ...currentWidget,
        id: generatorPageWidgetId(pageWidgetsRef.value)
      };
    }

    return {
      widgetsUsed,
      asidesCompute,
      asideWidgets: asideWidgetsRef,
      defaultExpandedAsideName,
      handleSetAsideDragStart,
      handleClone,
      handleAddPageWidget
    };
  },

  render () {
    const {
      widgetsUsed,
      asidesCompute,
      asideGroup,
      defaultExpandedAsideName,
      handleSetAsideDragStart,
      handleClone,
      handleAddPageWidget
    } = this;

    // 渲染Aside
    function renderDragAside (asides: Widget<any>[]) {
      return (
        <Draggable
          list={asides}
          itemKey="id"
          class='aside-ng'
          clone={handleClone}
          {...{
            group: { name: 'free', pull: 'clone', put: false },
            sort: false,
            onStart: () => handleSetAsideDragStart(true),
            onEnd: () => handleSetAsideDragStart(false)
          }}
        >
          {{
            item: ({ element }: { element: AsideWidget<any> }) => {
              return <div class='aside-ngi' onClick={() => handleAddPageWidget(element)}>
                <NSpace
                  vertical
                  align='center'
                  size={0}
                >
                  <i class='aside-image' style={{
                    backgroundImage: `url(${element.thumb})`
                  }} />
                  <NText class='aside-name'>{element.name}</NText>
                  <NText class='aside-count' depth={3}>{widgetsUsed[element.key]}/{element.allowCount}</NText>
                </NSpace>
              </div>;
            }
          }}
        </Draggable>
      );
    }

    return (
      asideGroup
        ? <NCollapse defaultExpandedNames={defaultExpandedAsideName}>
          {}
            {
              (asidesCompute as AsideGroupOnId[]).map(group => {
                return (
                  <NCollapseItem
                    title={group.title}
                    name={group.key}
                  >
                    {renderDragAside(group.children)}
                  </NCollapseItem>
                );
              })
            }
          </NCollapse>
        : (
            renderDragAside(asidesCompute as AsideWidget<any>[])
          )
    );
  }
});
