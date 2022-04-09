import { FreeActionTitle } from '../../core';
import { ArrowFit20Regular, BorderOutside24Regular, DocumentText20Regular, Line24Regular, LineDashes20Regular, LineDashes24Filled, LineHorizontal120Regular } from '@vicons/fluent';
import { NButton, NColorPicker, NForm, NFormItem, NIcon, NRadioButton, NRadioGroup, NSlider, NSpace, NText } from 'naive-ui';
import { computed, defineComponent, ref, unref } from 'vue';
import { widgetDataProps } from 'free-core/core/src/utils';

import './style.scss';

export type WhiteHeightType = 'empty' | 'line';
export type WhiteHeightLineStyle = 'solid' | 'dashed' | 'dotted';
export interface WhiteHeightProps {
  type: WhiteHeightType,
  empty: {
    height: number
  },
  line: {
    style: WhiteHeightLineStyle
    padding: string
    color: string
  }
}

export default defineComponent({
  name: 'WhiteHeight',

  props: widgetDataProps<WhiteHeightProps>({
    type: 'empty',
    empty: {
      height: 30
    },
    line: {
      style: 'solid',
      padding: '0',
      color: '#e5e5e5'
    }
  }),

  setup (props) {
    const model = ref<WhiteHeightProps>(props.data);
    const modelUnref = unref(model);

    const lineStyleText = computed(() => {
      let text = '';
      switch (model.value.line.style) {
        case 'solid':
          text = '实现';
          break;
        case 'dashed':
          text = '虚线';
          break;
        case 'dotted':
          text = '点线';
          break;
      }

      return text;
    });

    function renderAction () {
      return (
        <>
          <FreeActionTitle title='辅助空白' />
          <div class='white-height-form'>
            <NForm
              class='free-action-form'
              labelAlign='left'
              labelPlacement='left'
            >
              <NFormItem label='分割类型'>
                <NSpace align='center' justify='space-between' style={{ width: '100%' }}>
                  <NText>{ modelUnref.type === 'empty' ? '辅助空白' : '辅助线' }</NText>
                  <NRadioGroup v-model:value={modelUnref.type}>
                    <NRadioButton value='empty' key='empty'>
                      <NIcon size={20} style={{
                        marginTop: '6px'
                      }}>
                        <DocumentText20Regular />
                      </NIcon>
                    </NRadioButton>
                    <NRadioButton value='line' key='line'>
                      <NIcon size={20} style={{
                        marginTop: '7px'
                      }}>
                        <LineHorizontal120Regular />
                      </NIcon>
                    </NRadioButton>
                  </NRadioGroup>
                </NSpace>
              </NFormItem>
              {
                modelUnref.type === 'empty'
                  ? (
                      <NFormItem label='空白高度'>
                        <NSlider min={8} v-model:value={modelUnref.empty.height} />
                      </NFormItem>
                    )
                  : (
                      <>
                        <NFormItem label='选择样式'>
                          <NSpace align='center' justify='space-between' style={{ width: '100%' }}>
                            <NText>{ lineStyleText.value}</NText>
                            <NRadioGroup v-model:value={modelUnref.line.style}>
                              <NRadioButton value='solid' key='solid'>
                                <NIcon size={20} style={{
                                  marginTop: '6px'
                                }}>
                                  <Line24Regular />
                                </NIcon>
                              </NRadioButton>
                              <NRadioButton value='dashed' key='dashed'>
                                <NIcon size={20} style={{
                                  marginTop: '7px'
                                }}>
                                  <LineDashes20Regular />
                                </NIcon>
                              </NRadioButton>
                              <NRadioButton value='dotted' key='dotted'>
                                <NIcon size={20} style={{
                                  marginTop: '7px'
                                }}>
                                  <LineDashes24Filled />
                                </NIcon>
                              </NRadioButton>
                            </NRadioGroup>
                          </NSpace>
                        </NFormItem>
                        <NFormItem label='左右边距'>
                          <NSpace align='center' justify='space-between' style={{ width: '100%' }}>
                            <NText>{ modelUnref.line.padding !== '0' ? '左右留边' : '无边距' }</NText>
                            <NRadioGroup v-model:value={modelUnref.line.padding}>
                              <NRadioButton value='0' key='false'>
                                <NIcon size={20} style={{
                                  marginTop: '6px'
                                }}>
                                  <BorderOutside24Regular />
                                </NIcon>
                              </NRadioButton>
                              <NRadioButton value='0 15px' key='true'>
                                <NIcon size={20} style={{
                                  marginTop: '7px'
                                }}>
                                  <ArrowFit20Regular />
                                </NIcon>
                              </NRadioButton>
                            </NRadioGroup>
                          </NSpace>
                        </NFormItem>
                        <NFormItem label='辅助线颜色' labelAlign='center' labelPlacement='left'>
                          <NSpace align='center' justify='space-between' style={{ width: '100%' }}>
                            <NText>{modelUnref.line.color}</NText>
                            <NSpace>
                              <NButton quaternary size='small' type='primary' onClick={() => {
                                modelUnref.line.color = '#e5e5e5';
                              }}>重置</NButton>
                              <NColorPicker size='small' v-model:value={modelUnref.line.color} style={{
                                width: '80px'
                              }} showAlpha={false} />
                            </NSpace>
                          </NSpace>
                        </NFormItem>
                      </>
                    )
              }
            </NForm>
          </div>
        </>
      );
    }

    return {
      renderAction,
      model
    };
  },

  render () {
    const {
      model
    } = this;
    return (
      <div>
        {
          model.type === 'empty'
            ? (
                <div class='white-height' style={{
                  height: `${model.empty.height}px`
                }}></div>
              )
            : (
                <div class='white-line' style={{
                  height: '8px',
                  padding: model.line.padding
                }}>
                  <div style={{
                    borderTop: `1px ${model.line.style} ${model.line.color}`
                  }}></div>
                </div>
              )
        }
      </div>
    );
  }
});
