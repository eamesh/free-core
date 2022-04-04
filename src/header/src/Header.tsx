import { useFree } from '../../core/src/hooks/free';
import { NDivider, NImage, NSpace } from 'naive-ui';
import { computed, defineComponent } from 'vue';
import FreeHeader from '../';
import Electric from '../assets/electric.png';
import Wifi from '../assets/wifi.png';
import Signal from '../assets/signal.png';

import './style.scss';
import { useAction } from './action';
import { usePage } from '../../core/src/hooks/page';
import { fixedWidgetDataProps } from 'free-core/core/src/utils';

export interface FreeHeaderProps {
  backgroundColor: string;
}

export default defineComponent({
  name: 'FreeHeader',

  props: fixedWidgetDataProps<FreeHeaderProps>({
    backgroundColor: '#fff'
  }),

  setup () {
    const {
      currentFixedWidgetKey,
      fixedWidgetKeyDomRef
    } = useFree();

    const {
      handleSetCurrentFixedWidgetKey
    } = usePage();

    const {
      model,
      renderAction
    } = useAction();

    // 选中效果
    function handleSelect () {
      handleSetCurrentFixedWidgetKey(FreeHeader.key);
    }

    const activeCompute = computed(() => {
      return currentFixedWidgetKey.value === FreeHeader.key;
    });

    const pageTitle = computed(() => {
      console.log(fixedWidgetKeyDomRef.value['free-page']);
      return fixedWidgetKeyDomRef.value['free-page'] ? fixedWidgetKeyDomRef.value['free-page'].model.title : '';
    });

    return {
      model,
      renderAction,
      currentFixedWidgetKey,
      active: activeCompute,
      handleSelect,
      pageTitle
    };
  },

  render () {
    const {
      active
    } = this;

    return (
      <div
        class={[
          'free-navigationbar',
          {
            active
          }
        ]}
        onClick={this.handleSelect}
        style={{
          backgroundColor: this.model.backgroundColor
        }}
      >
        <div class='free-navigationbar-top'>
          <NSpace style={{
            padding: '0 14px 0 21px',
            height: '44px'
          }} justify='space-between' align='center'>
            <div class='top-time'>9:41</div>
            <NSpace class='top-electric' size={[5, 0]}>
              <NImage src={Signal} />
              <NImage src={Wifi} />
              <NImage src={Electric} />
            </NSpace>
          </NSpace>
        </div>
        <div class='free-navigationbar-bottom'>
          <div class='left'></div>
          <div class='center'>
            <div class='free-navigationbar-title'>
              <div class='text'>{this.pageTitle}</div>
            </div>
          </div>
          <div class='right'>
            <div class='free-navigationbar-capsule'>
              <div class='menu'></div>
              <NDivider style={{
                margin: 0
              }} vertical />
              <div class='dot'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
