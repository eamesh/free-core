import { defineComponent, h, watch } from 'vue';
import Draggable from 'vuedraggable';
import { NIcon, NSpace, NText } from 'naive-ui';
import DragableItem from './DragableItem';
import { useAside } from '../hooks/aside';
import { usePage } from '../hooks/page';
import { CoreWidget, PageWidget } from '../interface';
import { useFree } from '../hooks/free';
import { useLayout } from '../hooks/layout';
import { useAction } from '../hooks/action';
import { cloneDeep } from 'lodash-es';

/**
 * Page的右上角固定部分，没想到什么好思路。widget action部分需要组件实例化之后拿到内部action
 * widget和action之所以没有分开，是懒得做组件之间数据维护。放到内部公用数据. 但问题是不实例化拿不到action
 * 只能渲染整个widget 然后隐藏dom 😄
 * 维护一个fixed widget ref集合， key => ref 进行缓存
 * fixed action部分通过 key => ref 渲染内部action
 * 懒得动脑子换思路了
 *
 */
export default defineComponent({
  name: 'FreePage',

  setup () {
    const {
      pageWidgetsRef,
      handleSetRefs,
      handleSetCurrentPageId,
      handleSetCurrentFixedWidgetKey
    } = usePage();

    const {
      headerWidgetRef,
      footerWidgetRef,
      // headerRef,
      // footerRef,
      fixedWidgetKeyDomRef,
      currentFixedWidgetKey,
      pageStyleRef
    } = useFree();

    const {
      fixedCoreWidgetsCompute
    } = useLayout();

    const {
      asideDragStartRef
    } = useAside();

    const {
      handleSetRenderAction
    } = useAction();

    // 拖拽添加
    function handleDragChange (...args: any) {
      console.log(args);
      if (args[0].added) {
        const {
          added: { element: { id } }
        } = args[0];
        // 设置当前添加的Widget id
        handleSetCurrentPageId(id);
      }
    }

    // 设置fixed widget 实例化
    function handleSetFixedWidgetKeyDomRef (fixedRef: any, key: string) {
      console.log(fixedRef, key, fixedWidgetKeyDomRef);
      fixedWidgetKeyDomRef.value[key] = fixedRef;
    }

    function handleClickFixedCoreWidget (e: MouseEvent, widget: CoreWidget<any>) {
      e.preventDefault();
      handleSetCurrentFixedWidgetKey(widget.key);

      // 获取当前实例化dom
      // handleSetRenderAction(fixedWidgetKeyDomRef.value[widget.key].renderAction);
      // // 判断render
      // if (widget.render) {
      //   // header footer
      //   switch (widget.key) {
      //     case 'free-footer':
      //       handleSetRenderAction(footerRef.value.renderAction);
      //       break;

      //     case 'free-header':
      //       handleSetRenderAction(headerRef.value.renderAction);
      //       break;
      //   }
      // } else {
      //   handleSetRenderAction(widget.component);
      // }
    }

    watch(
      () => currentFixedWidgetKey.value,
      () => {
        console.info(currentFixedWidgetKey.value, fixedWidgetKeyDomRef.value);
        currentFixedWidgetKey.value !== undefined && handleSetRenderAction(fixedWidgetKeyDomRef.value[currentFixedWidgetKey.value!].renderAction);
      }
    );

    return {
      asideDragStart: asideDragStartRef,
      pageWidgets: pageWidgetsRef,
      handleDragChange,
      handleSetRefs,
      headerWidgetRef,
      footerWidgetRef,
      fixedCoreWidgetsCompute,
      handleClickFixedCoreWidget,
      // headerRef,
      // footerRef,
      handleSetFixedWidgetKeyDomRef,
      pageStyle: pageStyleRef,
      currentFixedWidgetKey
    };
  },

  render () {
    const {
      asideDragStart,
      handleDragChange,
      handleSetRefs,
      fixedCoreWidgetsCompute,
      handleClickFixedCoreWidget,
      handleSetFixedWidgetKeyDomRef
    } = this;

    return (
      <>
        <div class='preview-page'>
          <NSpace vertical>
            {
              fixedCoreWidgetsCompute.map((widget) => {
                return (
                  <div
                    class={[
                      'preview-page-item',
                      {
                        active: this.currentFixedWidgetKey === widget.key
                      }
                    ]}
                    onClick={(e) => handleClickFixedCoreWidget(e, widget)}
                  >
                    <NIcon size={14}>
                      {h(widget?.icon)}
                    </NIcon>
                    <NText>{widget?.name}</NText>
                  </div>
                );
              })
            }
          </NSpace>
        </div>
        <div style={{
          display: 'none'
        }}>
          {
            // 初始化dom
            // 过滤掉free-footer free-header
            // free-footer free-header 单独初始化
            fixedCoreWidgetsCompute.filter((widget) => !['free-footer', 'free-header'].includes(widget.key)).map((widget: CoreWidget<any>) => {
              return <widget.component {...{
                widgetKey: widget.key,
                data: widget.data ? cloneDeep(widget.data) : {}
              }} ref={(e) => handleSetFixedWidgetKeyDomRef(e, widget.key)} />;
            })
          }
        </div>
        <div class='preview'>
          <div class='content'>
            <div
              class={[
                'preview-container',
                {
                  'aside-drag-start': asideDragStart
                }
              ]}
              style={this.pageStyle}
            >
              {this.headerWidgetRef && this.headerWidgetRef.render
                ? (
                    <this.headerWidgetRef.component {...{
                      widgetKey: this.headerWidgetRef.key,
                      data: this.headerWidgetRef.data
                        ? cloneDeep(this.headerWidgetRef.data)
                        : {}
                    }} ref={e => handleSetFixedWidgetKeyDomRef(e, 'free-header')} />
                  )
                : null}
              <Draggable
                v-model={this.pageWidgets}
                itemKey='id'
                class='drag-preview'
                {...{
                  group: 'free',
                  onChange: handleDragChange
                }}>

                  {{
                    item: ({ element }: { element: PageWidget<any> }) => (
                      <DragableItem info={element}>
                        <element.component {...{
                          id: element.id,
                          widgetKey: element.key,
                          data: element.data ? cloneDeep(element.data) : {}
                        }} ref={(e) => handleSetRefs(e, element.id as number)} />
                      </DragableItem>
                    )
                  }}

                </Draggable>
            </div>
            <div class='preview-footer'>
              {this.footerWidgetRef && this.footerWidgetRef.render
                ? (
                    <this.footerWidgetRef.component {...{
                      widgetKey: this.headerWidgetRef.key,
                      data: this.footerWidgetRef.data
                        ? cloneDeep(this.footerWidgetRef.data)
                        : {}
                    }} ref={e => handleSetFixedWidgetKeyDomRef(e, 'free-footer')} />
                  )
                : null}
            </div>
          </div>
        </div>
      </>
    );
  }
});
