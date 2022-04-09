import { AsideWidget } from '../interface';
import { generatorPageWidgetId } from '../utils';
import { useFree } from './free';

export function usePage () {
  const {
    pageWidgetsRef,
    currentPageIdRef,
    widgetsRefs,
    currentPageWidget,
    currentFixedWidgetKey,
    currentPageWidgetIndex
  } = useFree();

  // 设置当前page焦点id
  function handleSetCurrentPageId (id: number) {
    console.log('set page current id', id);
    currentPageIdRef.value = id;
    handleUnsetCurrentFixedWidgetKey();
  }

  // 取消page焦点id
  function handelUnsetCurrentPageId () {
    currentPageIdRef.value = undefined;
  }

  // 添加Page widget
  function handleAddPageWidget (widget: AsideWidget<any>) {
    // const id = pageWidgetsRef.value.length;
    const id = generatorPageWidgetId(pageWidgetsRef.value);
    pageWidgetsRef.value.push({
      ...widget,
      id
    });

    // 设置焦点id
    handleSetCurrentPageId(id);
  }

  // 删除当前焦点widget
  function handelDeleteCurrentWidget () {
    pageWidgetsRef.value.splice(currentPageWidgetIndex.value, 1);
    // 清空当前widget id
    currentPageIdRef.value = undefined;
  }

  // 根据widget id 删除page widget
  function handleDeleteByWidgetId (id: number) {
    const index = pageWidgetsRef.value.findIndex(item => item.id === id);
    pageWidgetsRef.value.splice(index, 1);
    // 清空当前widget id
    currentPageIdRef.value = undefined;
  }

  // 清空page
  function handleClearPage () {
    pageWidgetsRef.value = [];
    currentPageIdRef.value = undefined;
  }

  // // 当前Page焦点widget
  // const currentPageWidget = computed(() => {
  //   return pageWidgetsRef.value.find(item => item.id === currentPageIdRef.value);
  // });

  // // 当前Page焦点widget index
  // const currentPageWidgetIndex = computed(() => {
  //   return pageWidgetsRef.value.findIndex(item => item.id === currentPageIdRef.value);
  // });

  // 设置page widgets ref用于获取实体
  // 对应关系 id => widget
  function handleSetRefs (node: any, id: number) {
    widgetsRefs.value[id] = node;
  }

  // 设置固定Widget 当前key
  function handleSetCurrentFixedWidgetKey (key: string) {
    currentFixedWidgetKey.value = key;
    // 重置page current id
    handelUnsetCurrentPageId();
  }

  // 取消固定widget 当前key
  function handleUnsetCurrentFixedWidgetKey () {
    currentFixedWidgetKey.value = undefined;
  }

  return {
    pageWidgetsRef,
    currentPageIdRef,
    currentPageWidget,
    currentPageWidgetIndex,
    handleSetRefs,
    handleSetCurrentPageId,
    handleAddPageWidget,
    handelDeleteCurrentWidget,
    handelUnsetCurrentPageId,
    handleSetCurrentFixedWidgetKey,
    handleUnsetCurrentFixedWidgetKey,
    handleDeleteByWidgetId,
    handleClearPage
  };
}
