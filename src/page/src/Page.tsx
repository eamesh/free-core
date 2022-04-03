import { useFree } from 'free-layout/core/src/hooks/free';
import { NButton, NColorPicker, NDivider, NForm, NFormItem, NInput, NRadio, NRadioGroup, NSpace, NText } from 'naive-ui';
import { defineComponent, ref, unref, watch } from 'vue';
import { FreeActionTitle } from 'free-layout/core';

const DEFAULT_COLOR = '#f7f8fa';

export default defineComponent({
  name: 'FreePage',

  abstract: true,

  setup () {
    const {
      pageStyleRef
    } = useFree();
    const backgroundColorMode = ref('default');

    const model = ref({
      title: '微页面标题',
      description: '',
      backgroundColor: DEFAULT_COLOR
    });
    const modelUnref = unref(model);

    watch(
      () => backgroundColorMode.value,
      () => {
        backgroundColorMode.value === 'default' && (
          modelUnref.backgroundColor = DEFAULT_COLOR
        );
      }
    );

    watch(
      () => modelUnref.backgroundColor,
      () => {
        pageStyleRef.value = {
          backgroundColor: modelUnref.backgroundColor
        };
        console.log(pageStyleRef.value);
      },
      {
        immediate: true
      }
    );

    function handleResetBackgroundColor () {
      modelUnref.backgroundColor = DEFAULT_COLOR;
    }

    // 渲染Action
    function renderAction () {
      return (
        <>
          <FreeActionTitle title='页面设置' />
          <div class='free-action-form'>
            <NForm>
              <NFormItem label='页面名称'>
                <NInput v-model:value={modelUnref.title} placeholder={''} />
              </NFormItem>
              <NFormItem label='页面描述'>
                <NInput v-model:value={modelUnref.description} placeholder={''} />
              </NFormItem>
              <NDivider style={{
                marginTop: 0
              }} />
              <NFormItem labelAlign='left' labelPlacement='left' label='背景颜色'>
                <NSpace style={{
                  width: '100%',
                  flexDirection: 'row-reverse'
                }}>
                  <NRadioGroup v-model:value={backgroundColorMode.value} name="radiogroup">
                    <NSpace align='center'>
                      <NRadio value='default' key='default'>
                        <NText>默认背景色</NText>
                      </NRadio>
                      <NRadio value='custom' key='custom'>
                        <NText>自定义背景色</NText>
                      </NRadio>
                    </NSpace>
                  </NRadioGroup>
                </NSpace>
              </NFormItem>
              {
                backgroundColorMode.value === 'custom'
                  ? (
                  <>
                    <div
                      style={{
                        display: 'flex',
                        flexFlow: 'row-reverse nowrap',
                        alignItems: 'center'
                      }}
                    >
                      <NColorPicker size='small' v-model:value={modelUnref.backgroundColor} style={{
                        width: '80px',
                        marginLeft: '12px'
                      }} />
                      <NButton quaternary size='small' onClick={() => handleResetBackgroundColor()}>
                        重置
                      </NButton>
                    </div>
                  </>
                    )
                  : null
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
    return (
      <div></div>
    );
  }
});
