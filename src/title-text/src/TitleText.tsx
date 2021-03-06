import { FreeActionTitle } from '../../core';
import { TextAlignCenter20Regular, TextAlignLeft20Regular, TextFont16Filled, TextFont20Regular } from '@vicons/fluent';
import { FormRules, NButton, NCheckbox, NColorPicker, NDivider, NForm, NFormItem, NIcon, NInput, NRadioButton, NRadioGroup, NSpace, NText } from 'naive-ui';
import { computed, CSSProperties, defineComponent, ref, unref } from 'vue';
import { widgetDataProps } from 'free-core/core/src/utils';

import './style.scss';

export type TitleTextTitleAligin = 'left' | 'center';
export type TitleTextWeight = 'bold' | '400';
export type TitleTextFontSize = 16 | 14 | 12;
export interface TitleTextProps {
  bottomDivider: boolean,
  style: {
    backgroundColor: string
  },
  title: {
    text: string,
    aligin: TitleTextTitleAligin,
    style: {
      fontSize: TitleTextFontSize,
      fontWeight: TitleTextWeight,
      color: string
    }
  },
  description: {
    text: string,
    style: {
      fontSize: TitleTextFontSize,
      fontWeight: TitleTextWeight,
      color: string
    }
  }
}

export default defineComponent({
  name: 'TitleText',

  props: widgetDataProps<TitleTextProps>({
    bottomDivider: false,
    style: {
      backgroundColor: '#fff'
    },
    title: {
      text: '',
      aligin: 'left',
      style: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#323233'
      }
    },
    description: {
      text: '',
      style: {
        fontSize: 12,
        fontWeight: '400',
        color: '#969799'
      }
    }
  }),

  setup (props) {
    const model = ref(props.data);

    const rules: FormRules = {
      title: {
        text: {
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }
      }
    };

    const modelUnref = unref(model);

    function handleGetFontSizeText (fontSize: number) {
      let text = '';
      switch (fontSize) {
        case 16:
          text = '大(16号)';
          break;
        case 14:
          text = '中(14号)';
          break;
        case 12:
          text = '小(12号)';
          break;
      }

      return text;
    }

    const showTitleFontSizeText = computed(() => {
      const {
        title: { style }
      } = modelUnref;

      return handleGetFontSizeText(style.fontSize);
    });

    const showDescriptionFontSizeText = computed(() => {
      const {
        description: { style }
      } = modelUnref;

      return handleGetFontSizeText(style.fontSize);
    });

    function handleGetFontWeightText (fontWeight: string) {
      return fontWeight === 'bold' ? '加粗体' : '常规体';
    }

    const showTitleFontWeightText = computed(() => {
      const {
        title: { style }
      } = modelUnref;

      return handleGetFontWeightText(style.fontWeight);
    });

    const showDescriptionFontWeightText = computed(() => {
      const {
        title: { style }
      } = modelUnref;

      return handleGetFontWeightText(style.fontWeight);
    });

    function renderAction () {
      return (
        <>
          <FreeActionTitle title='标题文本' />
          <div class='title-text-form'>
            <NForm
              rules={rules}
              model={modelUnref}
              class='free-action-form'
            >
              <NFormItem label='标题内容' path='title.text'>
                <NInput v-model:value={modelUnref.title.text} placeholder={'请输入标题'} />
              </NFormItem>
              <NFormItem label='描述内容' path='description.text'>
              <NInput v-model:value={modelUnref.description.text} type='textarea' maxlength={500} rows={2} placeholder={'请输入要说明的文字, 最多500字符'} />
              </NFormItem>
              <NDivider style={{
                marginTop: 0
              }} />
              <div class='title-text-form__main'>
                <NFormItem label='显示位置' labelAlign='left' labelPlacement='left'>
                  <NSpace align='center' justify='space-between' style={{ width: '100%' }}>
                    <NText>{ modelUnref.title.aligin === 'left' ? '居左显示' : '居中显示' }</NText>
                    <NRadioGroup size='small' v-model:value={modelUnref.title.aligin}>
                      <NRadioButton value='left' key='left'>
                        <NIcon size={20} style={{
                          marginTop: '4px'
                        }}>
                          <TextAlignLeft20Regular />
                        </NIcon>
                      </NRadioButton>
                      <NRadioButton value='center' key='center'>
                        <NIcon size={20} style={{
                          marginTop: '4px'
                        }}>
                          <TextAlignCenter20Regular />
                        </NIcon>
                      </NRadioButton>
                    </NRadioGroup>
                  </NSpace>
                </NFormItem>
                <NFormItem label='标题大小' labelAlign='left' labelPlacement='left'>
                  <NSpace align='center' justify='space-between' style={{ width: '100%' }}>
                    <NText>{showTitleFontSizeText.value}</NText>
                    <NRadioGroup size='small' v-model:value={modelUnref.title.style.fontSize}>
                      <NRadioButton value={16} key='big'>
                        <NIcon size={16} style={{
                          marginTop: '6px'
                        }}>
                          <TextFont20Regular />
                        </NIcon>
                      </NRadioButton>
                      <NRadioButton value={14} key='mid'>
                        <NIcon size={14} style={{
                          marginTop: '6px'
                        }}>
                          <TextFont20Regular />
                        </NIcon>
                      </NRadioButton>
                      <NRadioButton value={12} key='small'>
                        <NIcon size={12} style={{
                          marginTop: '6px'
                        }}>
                          <TextFont20Regular />
                        </NIcon>
                      </NRadioButton>
                    </NRadioGroup>
                  </NSpace>
                </NFormItem>
                <NFormItem label='描述大小' labelAlign='left' labelPlacement='left'>
                  <NSpace align='center' justify='space-between' style={{ width: '100%' }}>
                    <NText>{showDescriptionFontSizeText.value}</NText>
                    <NRadioGroup size='small' v-model:value={modelUnref.description.style.fontSize}>
                      <NRadioButton value={16} key='big'>
                        <NIcon size={16} style={{
                          marginTop: '6px'
                        }}>
                          <TextFont20Regular />
                        </NIcon>
                      </NRadioButton>
                      <NRadioButton value={14} key='mid'>
                        <NIcon size={14} style={{
                          marginTop: '6px'
                        }}>
                          <TextFont20Regular />
                        </NIcon>
                      </NRadioButton>
                      <NRadioButton value={12} key='small'>
                        <NIcon size={12} style={{
                          marginTop: '6px'
                        }}>
                          <TextFont20Regular />
                        </NIcon>
                      </NRadioButton>
                    </NRadioGroup>
                  </NSpace>
                </NFormItem>
                <NFormItem label='标题粗细' labelAlign='left' labelPlacement='left'>
                  <NSpace align='center' justify='space-between' style={{ width: '100%' }}>
                    <NText>{showTitleFontWeightText.value}</NText>
                    <NRadioGroup size='small' v-model:value={modelUnref.title.style.fontWeight}>
                      <NRadioButton value='400' key='light'>
                        <NIcon size={16} style={{
                          marginTop: '4px'
                        }}>
                          <TextFont20Regular />
                        </NIcon>
                      </NRadioButton>
                      <NRadioButton value='bold' key='bold'>
                        <NIcon size={20} style={{
                          marginTop: '4px'
                        }}>
                          <TextFont16Filled />
                        </NIcon>
                      </NRadioButton>
                    </NRadioGroup>
                  </NSpace>
                </NFormItem>
                <NFormItem label='描述粗细' labelAlign='center' labelPlacement='left'>
                  <NSpace align='center' justify='space-between' style={{ width: '100%' }}>
                    <NText>{showDescriptionFontWeightText.value}</NText>
                    <NRadioGroup size='small' v-model:value={modelUnref.description.style.fontWeight}>
                      <NRadioButton value='400' key='light'>
                        <NIcon size={16} style={{
                          marginTop: '4px'
                        }}>
                          <TextFont20Regular />
                        </NIcon>
                      </NRadioButton>
                      <NRadioButton value='bold' key='bold'>
                        <NIcon size={20} style={{
                          marginTop: '4px'
                        }}>
                          <TextFont16Filled />
                        </NIcon>
                      </NRadioButton>
                    </NRadioGroup>
                  </NSpace>
                </NFormItem>
                <NFormItem label='标题颜色' labelAlign='center' labelPlacement='left'>
                  <NSpace align='center' justify='space-between' style={{ width: '100%' }}>
                    <NText>{modelUnref.title.style.color}</NText>
                    <NSpace>
                      <NButton size='small' quaternary type='primary' onClick={() => {
                        modelUnref.title.style.color = '#323233';
                      }}>重置</NButton>
                      <NColorPicker show size='small' v-model:value={modelUnref.title.style.color} style={{
                        width: '80px'
                      }} showAlpha={false} />
                    </NSpace>
                  </NSpace>
                </NFormItem>
                <NFormItem label='描述颜色' labelAlign='center' labelPlacement='left'>
                  <NSpace align='center' justify='space-between' style={{ width: '100%' }}>
                    <NText>{modelUnref.description.style.color}</NText>
                    <NSpace>
                      <NButton size='small' quaternary type='primary' onClick={() => {
                        modelUnref.description.style.color = '#969799';
                      }}>重置</NButton>
                      <NColorPicker size='small' v-model:value={modelUnref.description.style.color} style={{
                        width: '80px'
                      }} showAlpha={false} />
                    </NSpace>
                  </NSpace>
                </NFormItem>
                <NFormItem label='背景颜色' labelAlign='center' labelPlacement='left'>
                  <NSpace align='center' justify='space-between' style={{ width: '100%' }}>
                    <NText>{modelUnref.style.backgroundColor}</NText>
                    <NSpace>
                      <NButton size='small' quaternary type='primary' onClick={() => {
                        modelUnref.style.backgroundColor = '#fff';
                      }}>重置</NButton>
                      <NColorPicker size='small' v-model:value={modelUnref.style.backgroundColor} style={{
                        width: '80px'
                      }} showAlpha={false} />
                    </NSpace>
                  </NSpace>
                </NFormItem>
                <NFormItem label='底部分割线' labelAlign='left' labelPlacement='left'>
                  <NSpace align='center' justify='space-between' style={{ width: '100%' }}>
                    <NText>{modelUnref.bottomDivider ? '显示' : '不显示'}</NText>
                    <NCheckbox v-model:checked={modelUnref.bottomDivider} />
                  </NSpace>
                </NFormItem>
              </div>
            </NForm>
          </div>
        </>
      );
    }

    const titleStyle = computed(() => {
      return {
        ...modelUnref.title.style,
        fontSize: `${modelUnref.title.style.fontSize}px`
      };
    });

    const descriptionStyle = computed(() => {
      return {
        ...modelUnref.description.style,
        fontSize: `${modelUnref.description.style.fontSize}px`
      };
    });

    return {
      renderAction,
      model,
      titleStyle,
      descriptionStyle
    };
  },

  render () {
    const {
      model,
      titleStyle,
      descriptionStyle
    } = this;
    return (
      <div class='title-text' style={model.style}>
        <div class={[
          'title-text__content',
          {
            'title-text-center': model.title.aligin === 'center',
            divider: model.bottomDivider
          }
        ]}>
          <h1 class='title-text__title' style={titleStyle as CSSProperties}>{model.title.text}</h1>
          <p class='title-text__sub'>
            <pre class='title-text__desc' style={descriptionStyle as CSSProperties}>{model.description.text}</pre>
          </p>
        </div>
      </div>
    );
  }
});
