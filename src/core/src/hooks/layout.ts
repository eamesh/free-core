import { computed, CSSProperties, ref } from 'vue';
import { AsideGroup, CoreWidget, FixedWidget, PageWidget, Widget, WidgetNode, WidgetRefs } from '../interface';
import { Free } from '../../';

export const useLayout = () => {
  // 组件
  const asideWidgetsRef = ref<Widget<any>[] | AsideGroup[]>(Free.widgets);
  // 顶部组件
  const headerWidgetRef = ref<CoreWidget<any> | undefined>(Free.header ?? undefined);
  const headerRef = ref();
  // 底部组件
  const footerWidgetRef = ref<CoreWidget<any> | undefined>(Free.footer ?? undefined);
  const footerRef = ref();
  // 固定组件
  const fixedWidgetsRef = ref<FixedWidget[]>(Free.fixed);
  // 核心组件
  const coreWidgetsRef = ref<CoreWidget<any>[]>(Free.core);
  // 页面
  const pageWidgetsRef = ref<PageWidget<any>[]>([]);
  // aside dra start
  const asideDragStartRef = ref(false);
  // 当前Page焦点组件索引
  const currentPageIdRef = ref<number>();
  // 右上角固定位widgets
  const fixedCoreWidgetsCompute = computed(() => {
    return [
      ...coreWidgetsRef.value,
      headerWidgetRef.value,
      footerWidgetRef.value
    ].filter(item => item?.show) as CoreWidget<any>[];
  });
  // 渲染Action
  const renderAction = ref<WidgetNode>();
  // 当前选中的固定Widget key
  const currentFixedWidgetKey = ref<string>();

  // Page refs
  const widgetsRefs = ref<WidgetRefs>({});

  // fixed widget ref实例化缓存
  const fixedWidgetKeyDomRef = ref<any>({});

  // Page style
  const pageStyleRef = ref<CSSProperties>();

  return {
    asideWidgetsRef,
    pageWidgetsRef,
    asideDragStartRef,
    currentPageIdRef,
    widgetsRefs,
    headerWidgetRef,
    footerWidgetRef,
    fixedWidgetsRef,
    fixedCoreWidgetsCompute,
    coreWidgetsRef,
    headerRef,
    footerRef,
    renderAction,
    currentFixedWidgetKey,
    fixedWidgetKeyDomRef,
    pageStyleRef
    // currentPageWidgetRef
  };
};
