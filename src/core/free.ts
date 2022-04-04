import { AsideGroup, CoreWidget, FixedWidget, Widget } from './src/interface';

class Free {
  private _widgets: Widget<any>[] | AsideGroup[] = [];
  private _header: CoreWidget<any> | undefined = undefined;
  private _footer: CoreWidget<any> | undefined = undefined;
  private _fixed: FixedWidget[] = [];
  private _core: CoreWidget<any>[] = [];

  get widgets () {
    return this._widgets;
  }

  set widgets (widgets: Widget<any>[] | AsideGroup[]) {
    this._widgets = widgets;
  }

  set header (widget: CoreWidget<any> | undefined) {
    this._header = widget;
  }

  get header () {
    return this._header;
  }

  set footer (widget: CoreWidget<any> | undefined) {
    this._footer = widget;
  }

  get footer () {
    return this._footer;
  }

  set fixed (widgets: FixedWidget[]) {
    this._fixed = widgets;
  }

  get fixed () {
    return this._fixed;
  }

  set core (widgets: CoreWidget<any>[]) {
    this._core = widgets;
  }

  get core () {
    return this._core;
  }

  register (widgets: Widget<any>[] | AsideGroup[]) {
    this._widgets = widgets;
  }
}

export default Free;
