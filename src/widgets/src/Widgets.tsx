import { useFree } from '../../core/src/hooks/free';
import { defineComponent, ref } from 'vue';
import { FreeActionTitle } from '../../core';
import { NButton, NCard, NIcon, NPopconfirm, NSpace, NText, NTooltip } from 'naive-ui';
import Draggable from 'vuedraggable';
import { PageWidget } from '../../core/src/interface';
import { Copy20Regular, DataUsage20Regular, Delete16Regular } from '@vicons/fluent';
import { usePage } from '../../core/src/hooks/page';

import './style.scss';

export default defineComponent({
  name: 'FreeWidgets',

  setup () {
    const {
      pageWidgetsRef
    } = useFree();

    const {
      handleClearPage,
      handleDeleteByWidgetId
    } = usePage();

    const dragRef = ref(false);

    function renderAction () {
      return (
        <>
          <FreeActionTitle title='组件管理' />
          {
            pageWidgetsRef.value.length
              ? (
                  <NSpace
                    class='free-widget-manage'
                    vertical
                    size={14}
                  >
                    <NSpace style={{
                      flexFlow: 'row-reverse nowrap'
                    }}>
                      <NPopconfirm
                        onPositiveClick={() => handleClearPage()}
                      >
                        {{
                          trigger: () => {
                            return (
                              <NButton size='tiny' type='primary' quaternary>清空组件</NButton>
                            );
                          },
                          default: () => '清空？'
                        }}
                      </NPopconfirm>
                    </NSpace>
                    <Draggable
                      v-model={pageWidgetsRef.value}
                      itemKey={'id'}
                      tag='transition-group'
                      componentData={{
                        type: 'transition-group',
                        name: !dragRef.value ? 'flip-list' : null
                      }}
                      {...{
                        animation: 200,
                        onStart: () => {
                          dragRef.value = true;
                        },
                        onEnd: () => {
                          dragRef.value = false;
                        }
                      }}
                    >
                      {{
                        item: ({ element }: { element: PageWidget<any> }) => {
                          return (
                            <NCard
                              size='small'
                              class='widget-item'
                            >
                              <NSpace
                                justify='space-between'
                                align='center'
                              >
                                <NText>{element.name}</NText>
                                <NSpace align='center'>
                                  <NTooltip>
                                    {{
                                      trigger: () => (
                                        <NIcon size={20}>
                                          <Copy20Regular />
                                        </NIcon>
                                      ),

                                      default: () => '复制'
                                    }}
                                  </NTooltip>
                                  <NTooltip>
                                    {{
                                      trigger: () => (
                                        <NPopconfirm
                                          onPositiveClick={() => handleDeleteByWidgetId(element.id)}
                                        >
                                          {{
                                            trigger: () => {
                                              return (
                                                <NIcon size={20}>
                                                  <Delete16Regular />
                                                </NIcon>
                                              );
                                            },
                                            default: () => '删除？'
                                          }}
                                        </NPopconfirm>
                                      ),

                                      default: () => '删除'
                                    }}
                                  </NTooltip>
                                </NSpace>
                              </NSpace>

                            </NCard>
                          );
                        }
                      }}
                    </Draggable>
                  </NSpace>
                )
              : (
                  <div class='widget-empty'>
                    <NIcon size={80} color='#f2f3f5'>
                      <DataUsage20Regular />
                    </NIcon>
                    <NText>暂无数据</NText>
                  </div>
                )
          }

        </>
      );
    }

    return {
      renderAction,
      pageWidgetsRef
    };
  },

  render () {
    return (
      <div></div>
    );
  }
});
