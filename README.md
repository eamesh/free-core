### 微页面跨端编辑
前端布局仿有赞微页面  
页面布局使用[naive-ui](https://github.com/TuSimple/naive-ui)  
主要功能: 核心和业务分离，根据核心api开发widget 挂载到核心直接diy    
核心功能完成，抽空完成Widget开发，适配跨端微页面及小程序  

## Installation

```
pnpm add -D free-core naive-ui
```
<font size="2" color="red">注意：1.1.0-dev以下版本不可用</font>

## Preview
基础功能预览[Preview](https://free.emesh.cloud)  
基于[free-core](https://github.com/eamesh/free-core)的[Nutui](https://github.com/jdf2e/nutui)微页面编辑[Preview](https://nutui.emesh.cloud)

## Example
> 示例代码[Example](https://github.com/eamesh/free/blob/dev/example/App.vue)  
> 功能性Widget事例代码
- [标题文本](https://github.com/eamesh/free/blob/dev/src/title-text/index.ts)
- [图文导航](https://github.com/eamesh/free-nutui/blob/dev/src/components/image-nav/index.ts)

### Widget挂载到Core
```
import { Free, FreeLayout, FreeTitleTextWidget, FreeWhiteHeightWidget, FreePageWidget, FreeFooterWidget, FreeHeaderWidget, FreeWidgetsManageWidget } from 'free-core'

// Page header
Free.header = FreeHeaderWidget;

// Page footer
Free.footer = FreeFooterWidget;

// 右侧功能列表
Free.widgets = [
  // 功能性组件
  FreeTitleTextWidget,
  FreeWhiteHeightWidget
];

// 右上固定位widget
// free-header/free-footer 会直接挂载到右上固定位
Free.core = [
  FreePageWidget,
  FreeWidgetsManageWidget
];

// asideGroup 右侧组件列表分组结构
import { AsideGroup } from 'free-core/lib/types/core/src/interface'
const asides: AsideGroup[] = [
  {
    title: '基础组件',
    key: 'base',
    children: [
      FreeTitleTextWidget,
      FreeWhiteHeightWidget
    ]
  },
  {
    title: '营销组件',
    key: 'func',
    children: [
      TitleText,
      WhiteHeight
    ]
  }
];


const freeLayoutRef = ref();

// 获取Page数据
// freeLayoutRef.value.getPageData();
function handleGetPageData () {
  console.info('%c=====> getPageData:', 'color: #43bb88;font-size: 12px;font-weight: bold;text-decoration: underline;', freeLayoutRef.value.getPageData());
  const datas = freeLayoutRef.value.getPageData() as any;
  const page = datas.page.map((item: any) => {
    return {
      key: item.widgetKey,
      data: item.model
    };
  });
  const pageData: any = {
    page
  };
  Object.values(datas.core).forEach((item: any) => {
    pageData[item.widgetKey] = item.model || {};
  });

  console.log(JSON.stringify(pageData));
}

// 设置Page数据
function handleSetDefaultPageData () {
  const data: PageDataSchemas = {
    page: [
      {
        id: 1,
        ...NutuiSearchWidget,
        data: {}
      },
      {
        id: 2,
        ...NutuiNavigationWidget,
        data: {}
      },
      {
        id: 3,
        ...NutuiNoticeBarhWidget,
        data: {}
      },
      {
        id: 8,
        ...FreeWhiteHeightWidget,
        data: {
          type: 'empty',
          empty: {
            height: 8
          },
          line: {
            style: 'solid',
            padding: '0',
            color: '#e5e5e5'
          }
        }
      },
      ...
    ],
    core: [
      {
        ...FreePageWidget,
        data: {
          title: '默认页面',
          description: '',
          backgroundColor: '#f7f8fa'
        }
      }
    ]
  };

  console.log(freeLayoutRef.value);
  freeLayoutRef.value.setPageData(data);
}
// 布局
<FreeLayout asideGroup ref="freeLayoutRef" />
```

> 有空补文档

## Documentation

Widget类型
- Widget(功能组件)
- CoreWidget(系统组件)
- FixedWidget(固定位组件)

> 一个完整的Widget功能组件包含
```
{
  thumb: string;
  name: string;
  key: string;
  component: WidgetNode;
  params?: Object; // 参数
  data?: T; // 页面数据
  
}
```

> CoreWidget、FixedWidget功能组件包含
```
{
  name: string;
  key: string;
  component: WidgetNode;
  icon: VNode;
  show: true; // 是否显示固定位
  render: boolean; // Page是否渲染组件
  params?: Object; // 参数
  data?: T; // 页面数据
}
```

### Core Layout

> 核心暴露接口
```
export interface FreeLayoutInjection {
  asideDragStartRef: Ref<boolean>;
  asideWidgetsRef: Ref<Widget[] | AsideGroup[]>; // 右侧挂载菜单
  pageWidgetsRef: Ref<PageWidget[]>; // Page渲染的组件树
  currentPageIdRef: Ref<number | undefined>; // Page当前焦点Widget id
  widgetsRefs: Ref<WidgetRefs>; // Page 缓存的widget句柄
  asideGroupRef: Ref<boolean>; // 右侧菜单是否分组

  headerWidgetRef: Ref<CoreWidget>;
  footerWidgetRef: Ref<CoreWidget>;
  coreWidgetsRef: Ref<CoreWidget[]>;

  renderAction: Ref<WidgetNode>; // 当前渲染的右侧Action运行时
  currentFixedWidgetKey: Ref<string | undefined>; // 固定位当前焦点key
  fixedWidgetKeyDomRef: Ref<any>; // 固定位渲染的Widget 句柄集合

  pageStyleRef: Ref<CSSProperties>; // Page 外层样式句柄
  fixedCoreWidgetsCompute: ComputedRef<CoreWidget<any>[]>; // 当前fixedWidget显示的渲染树
}
```
> hooks相关暴露功能阅读hooks文件夹代码,有时间补相关文档


## Feature
- [x] 主业务逻辑
- [x] Widgets树挂载、功能挂件、核心挂件
- [x] Widget 模板、Action分离
- [x] 核心组件、右侧固定组件
- [ ] 其它功能组件
- [ ] 适配taro nutui [free-nutui](https://github.com/eamesh/free-nutui)

## Widget Feature
- [x] 标题文本
- [x] 辅助空白
- [ ] 电梯导航
- [ ] 图片广告
- [ ] 图文导航
- [ ] 搜索
- [ ] 公告
- [ ] 视频

## License

Free is licensed under the [MIT license](https://opensource.org/licenses/MIT).
