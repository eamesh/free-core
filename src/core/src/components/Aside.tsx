import { NCollapse, NCollapseItem, NSpace, NText } from 'naive-ui';
import { computed, defineComponent } from 'vue';
import { AsideGroup, Widget } from '../interface';
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
      const currentWidget = flattenAsidesCompute.value.find(item => item.id === id);

      return {
        ...currentWidget,
        id: generatorPageWidgetId(pageWidgetsRef.value)
      };
    }

    return {
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
            item: ({ element }: { element: any }) => {
              console.log(element);
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
                  {/* <NText class='aside-count' depth="3">{element.allowCount}</NText> */}
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
              (asidesCompute as AsideGroup[]).map(group => {
                return (
                  <NCollapseItem
                    title={group.title}
                    name={group.key}
                  >
                    {renderDragAside(group.children)}
                    {/* <Draggable list={group.children} tag="NGrid" componentData={{
                      yGap: 12,
                      cols: 2
                    }} itemKey="name">
                      {{
                        item: ({ element }: { element: any }) => {
                          console.log(element);
                          return <NGi class='aside-ngi'>
                            <NSpace
                              vertical
                              align='center'
                              size={0}
                            >
                              <i class='aside-image' style={{
                                backgroundImage: 'url(https://img01.yzcdn.cn/public_files/2019/02/12/add4829af43def85a200029c3e485d77.png)'
                              }} />
                              <NText class='aside-name'>{element.name}</NText>
                              <NText class='aside-count' depth="3">{element.allowCount}</NText>
                            </NSpace>
                          </NGi>;
                        }
                      }}
                    </Draggable> */}
                  </NCollapseItem>
                );
              })
            }
          </NCollapse>
        : (
            renderDragAside(asidesCompute as Widget<any>[])
          // <NGrid yGap={12} cols={2}>
          //   {
          //     (asideWidgets as Widget[]).map(child => {
          //       return (
          //         <NGi class='aside-ngi' {...{
          //           draggable: true
          //         }}>
          //           <NSpace
          //             vertical
          //             align='center'
          //             size={0}
          //           >
          //             <i class='aside-image' style={{
          //               backgroundImage: 'url(https://img01.yzcdn.cn/public_files/2019/02/12/add4829af43def85a200029c3e485d77.png)'
          //             }} />
          //             <NText class='aside-name'>{child.name}</NText>
          //             <NText class='aside-count' depth="3">{child.allowCount}</NText>
          //           </NSpace>
          //         </NGi>
          //       );
          //     })
          //   }
          // </NGrid>
          )
    );
  }
});
