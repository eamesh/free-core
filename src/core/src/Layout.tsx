import { computed, CSSProperties, defineComponent, onMounted, provide, ref } from 'vue';
import { cB, NLayout, NLayoutSider } from 'naive-ui';
import { useLayout } from './hooks/layout';
import Aside from './components/Aside';
import Page from './components/Page';
import Action from './components/Action';
import { freeLayoutInjectionKey } from './interface';
import freeLight, { FreeTheme } from './light';
import { ThemeProps, useConfig, useTheme } from 'naive-ui/lib/_mixins';

import './style.scss';

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
      asideWidgetsRef,
      pageWidgetsRef,
      asideDragStartRef,
      currentPageIdRef,
      widgetsRefs,
      headerWidgetRef,
      footerWidgetRef,
      fixedWidgetsRef,
      coreWidgetsRef,
      headerRef,
      footerRef,
      renderAction,
      currentFixedWidgetKey,
      fixedWidgetKeyDomRef,
      pageStyleRef
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

    function getPageData () {
      console.log('get page data');
      return {
        pageWidgetsRef,
        widgetsRefs
      };
    }

    provide(freeLayoutInjectionKey, {
      asideDragStartRef,
      asideWidgetsRef,
      pageWidgetsRef,
      currentPageIdRef,
      widgetsRefs,
      asideGroupRef,
      headerWidgetRef,
      footerWidgetRef,
      fixedWidgetsRef,
      coreWidgetsRef,
      headerRef,
      footerRef,
      renderAction,
      currentFixedWidgetKey,
      fixedWidgetKeyDomRef,
      pageStyleRef
    });

    return {
      asideWidgets: asideWidgetsRef,
      pageWidgets: pageWidgetsRef,
      asideDragStart: asideDragStartRef,
      cssVarsRef,
      getPageData
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
