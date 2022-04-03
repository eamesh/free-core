### 微页面跨端编辑
教弟弟业务代码，写到这块东西。觉得开源出来还挺有趣  
前端布局仿有赞微页面
主要功能核心业务分离，根据api开发widget 挂载到核心直接diy  
核心功能完成，抽空完成Widget开发，然后适配跨端小程序

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
  fixedWidgetsRef: Ref<FixedWidget[]>;
  coreWidgetsRef: Ref<CoreWidget[]>;

  headerRef: Ref;
  footerRef: Ref;

  renderAction: Ref<WidgetNode>; // 当前渲染的右侧Action运行时
  currentFixedWidgetKey: Ref<string | undefined>; // 固定位当前焦点key
  fixedWidgetKeyDomRef: Ref<any>; // 固定位渲染的Widget 句柄集合

  pageStyleRef: Ref<CSSProperties>; // Page 外层样式句柄
}
```
> hooks相关暴露功能阅读hooks文件夹代码,有时间补相关文档

## Example
> 示例代码[Example](https://github.com/eamesh/free/blob/dev/example/App.vue)  
> 功能性Widget事例代码[标题文本](https://github.com/eamesh/free/blob/dev/src/title-text/src/TitleText.tsx)

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
<FreeLayout asideGroup />
```

> 有空补文档

## Feature
- [x] 主业务逻辑
- [x] Widgets树挂载、功能挂件、核心挂件
- [x] Widget 模板、Action分离
- [x] 核心组件、右侧固定组件
- [ ] 其它功能组件
- [ ] 适配taro nutui

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
