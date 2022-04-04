import { createInjectionKey } from 'naive-ui/lib/_utils';
import { Component, CSSProperties, defineComponent, Ref, VNode } from 'vue';

export type WidgetNode = ReturnType<typeof defineComponent> | VNode | Component;

export interface WidgetSchema<T = Object> {
  name: string;
  key: string;
  component: WidgetNode;
  data?: T;
}

// 组件
export interface Widget<T> extends WidgetSchema<T> {
  allowCount: number;
  thumb: string;
}

// 固定组件
export interface CoreWidgetShow extends WidgetSchema {
  icon: WidgetNode;
  show: true;
  render: boolean; // Page是否渲染组件
}

export interface CoreWidgetRender extends WidgetSchema {
  icon?: WidgetNode;
  show: false;
  render: boolean; // Page是否渲染组件
}

export type CoreWidget = CoreWidgetRender | CoreWidgetShow

export interface FixedWidget extends WidgetSchema {
  icon: WidgetNode;
}

export interface PageWidget<T> extends Widget<T> {
  id: number;
}

export interface WidgetRefs {
  [key: number]: Ref<WidgetNode>;
}

export interface AsideGroup {
  title: string;
  key: string;
  children: Widget<any>[];
}

export interface FreeLayoutInjection {
  asideDragStartRef: Ref<boolean>;
  asideWidgetsRef: Ref<Widget<any>[] | AsideGroup[]>;
  pageWidgetsRef: Ref<PageWidget<any>[]>;
  currentPageIdRef: Ref<number | undefined>;
  widgetsRefs: Ref<WidgetRefs>;
  asideGroupRef: Ref<boolean>;

  headerWidgetRef: Ref<CoreWidget>;
  footerWidgetRef: Ref<CoreWidget>;
  fixedWidgetsRef: Ref<FixedWidget[]>;
  coreWidgetsRef: Ref<CoreWidget[]>;

  headerRef: Ref;
  footerRef: Ref;

  renderAction: Ref<WidgetNode>;
  currentFixedWidgetKey: Ref<string | undefined>;
  fixedWidgetKeyDomRef: Ref<any>;

  pageStyleRef: Ref<CSSProperties>;
}

export const freeLayoutInjectionKey = createInjectionKey<FreeLayoutInjection>('free-layout');
