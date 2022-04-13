import { computed, CSSProperties, defineComponent, nextTick, onMounted, provide, ref } from 'vue';
import { cB, NLayout, NLayoutSider } from 'naive-ui';
import { useLayout } from './hooks/layout';
import Aside from './components/Aside';
import Page from './components/Page';
import Action from './components/Action';
import { PageDataSchemas, freeLayoutInjectionKey, PageData, AsideGroup, AsideGroupOnId, AsideWidget } from './interface';
import freeLight, { FreeTheme } from './light';
import { ThemeProps, useConfig, useTheme } from 'naive-ui/lib/_mixins';

import './style.scss';
import { flatten } from './utils';

const freeLayoutProps = {
  ...(useTheme.props as ThemeProps<FreeTheme>),
  asideGroup: {
    type: Boolean,
    default: false
  },
  defaultFixedWidgetKey: {
    type: String,
    default: 'free-page'
  }
};

export default defineComponent({
  name: 'Layout',

  props: freeLayoutProps,

  setup (props) {
    const {
      pageContentRef,
      asideWidgetsRef,
      pageWidgetsRef,
      asideDragStartRef,
      currentPageIdRef,
      widgetsRefs,
      headerWidgetRef,
      footerWidgetRef,
      // fixedWidgetsRef,
      coreWidgetsRef,
      // headerRef,
      // footerRef,
      renderAction,
      currentFixedWidgetKey,
      fixedWidgetKeyDomRef,
      pageStyleRef,
      fixedCoreWidgetsCompute
    } = useLayout();

    onMounted(() => {
      currentFixedWidgetKey.value = props.defaultFixedWidgetKey;
    });

    const asideGroupRef = ref(props.asideGroup);

    const { mergedClsPrefixRef } = useConfig(props);
    const themeRef = useTheme(
      'Layout',
      '-free-layout',
      cB('layout', ''),
      freeLight,
      props,
      mergedClsPrefixRef
    );

    const cssVarsRef = computed(() => {
      const {
        common: {
          primaryColor,
          primaryColorPressed,
          primaryColorHover
        }
      } = themeRef.value;
      return {
        '--primary-color': primaryColor,
        '--primary-hover-color': primaryColorHover,
        '--primary-pressed-color': primaryColorPressed
      };
    });

    // 拉平左侧分组菜单组件
    const flattenAsidesCompute = computed(() => {
      return flatten(asidesCompute.value) as AsideWidget<any>[];
    });

    // 左侧菜单分组插入id
    const asidesCompute = computed(() => {
      let _id = 0;
      return asideWidgetsRef.value.map(item => {
        return asideGroupRef.value
          ? {
              ...item,
              children: (item as AsideGroup).children.map(child => {
                return {
                  ...child,
                  id: _id++,
                  usedCount: 0
                };
              })
            }
          : {
              ...item,
              id: _id++,
              usedCount: 0
            };
      }) as AsideWidget<any>[] | AsideGroupOnId[];
    });

    const widgetsUsed = computed(() => {
      const widgetsUsedByKey: { [key: string]: number; } = {};

      flattenAsidesCompute.value.forEach(item => {
        widgetsUsedByKey[item.key] = pageWidgetsRef.value.filter(pageWidget => pageWidget.key === item.key).length;
      });

      return widgetsUsedByKey;
    });

    // 当前Page焦点widget
    const currentPageWidget = computed(() => {
      return pageWidgetsRef.value.find(item => item.id === currentPageIdRef.value);
    });

    // 当前Page焦点widget index
    const currentPageWidgetIndex = computed(() => {
      return pageWidgetsRef.value.findIndex(item => item.id === currentPageIdRef.value);
    });

    // 获取页面数据
    function getPageData (): PageData {
      // widgetsRefs 独立于pageWidgetsRef的实例化缓存 id => dom的键值对 没有同步pageWidgetsRef的排序
      // 这里page按pageWidgets顺序排列widgetsRefs
      return {
        pageWidgets: pageWidgetsRef.value,
        page: pageWidgetsRef.value.map(widget => widgetsRefs.value[widget.id]),
        core: fixedWidgetKeyDomRef.value
      };
    }

    // 设置页面数据
    function setPageData (data: PageDataSchemas) {
      // 设置page widgets
      // 设置header widget
      // 设置footer widget
      // 设置core widgets
      data.page && (pageWidgetsRef.value = []);
      data.header && (headerWidgetRef.value = undefined);
      data.footer && (footerWidgetRef.value = undefined);
      data.core && (coreWidgetsRef.value = []);

      nextTick(() => {
        data.page && (pageWidgetsRef.value = data.page);
        data.header && (headerWidgetRef.value = data.header);
        data.footer && (footerWidgetRef.value = data.footer);
        data.core && (coreWidgetsRef.value = data.core);
      });

      setTimeout(() => {
        // 设置默认fixed wdiget
        coreWidgetsRef.value.findIndex((widget) => widget.key === props.defaultFixedWidgetKey) !== -1 && (currentFixedWidgetKey.value = props.defaultFixedWidgetKey);
      });

      console.log(coreWidgetsRef.value);
      // 重置
      currentFixedWidgetKey.value = undefined;
      currentPageIdRef.value = undefined;
      renderAction.value = null;
      fixedWidgetKeyDomRef.value = {};
    }

    provide(freeLayoutInjectionKey, {
      pageContentRef,
      asideDragStartRef,
      asideWidgetsRef,
      pageWidgetsRef,
      currentPageIdRef,
      widgetsRefs,
      asideGroupRef,
      headerWidgetRef,
      footerWidgetRef,
      // fixedWidgetsRef,
      coreWidgetsRef,
      // headerRef,
      // footerRef,
      renderAction,
      currentFixedWidgetKey,
      fixedWidgetKeyDomRef,
      pageStyleRef,
      fixedCoreWidgetsCompute,
      flattenAsidesCompute,
      asidesCompute,
      currentPageWidget,
      currentPageWidgetIndex,
      widgetsUsed
    });

    return {
      pageContentRef,
      asideWidgets: asideWidgetsRef,
      pageWidgets: pageWidgetsRef,
      asideDragStart: asideDragStartRef,
      cssVarsRef,
      getPageData,
      setPageData
    };
  },

  render () {
    const {
      asideGroup,
      asideWidgets
    } = this;

    return (
      <NLayout
        position='absolute'
        hasSider
        class='free-layout'
        style={this.cssVarsRef as CSSProperties}
      >
        <NLayoutSider
          width={200}
          contentStyle={{
            padding: '20px 12px'
          }}
        >
          {asideWidgets.length ? <Aside asideGroup={asideGroup} /> : null}
        </NLayoutSider>

        <NLayout
          style={{
            backgroundColor: '#f7f8fa'
          }}
          class='free-content'
          nativeScrollbar={false}
          ref="pageContentRef"
        >
          <Page />
        </NLayout>

        <NLayoutSider width={376}>
          <Action />
        </NLayoutSider>
      </NLayout>
    );
  }
});
