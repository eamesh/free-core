import { AsideGroup, CoreWidget, FixedWidget, Widget } from './src/interface';

class Free {
  private _widgets: Widget[] | AsideGroup[] = [];
  private _header: CoreWidget | undefined = undefined;
  private _footer: CoreWidget | undefined = undefined;
  private _fixed: FixedWidget[] = [];
  private _core: CoreWidget[] = [];

  get widgets () {
    return this._widgets;
  }

  set widgets (widgets: Widget[] | AsideGroup[]) {
    this._widgets = widgets;
  }

  set header (widget: CoreWidget | undefined) {
    this._header = widget;
  }

  get header () {
    return this._header;
  }

  set footer (widget: CoreWidget | undefined) {
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

  set core (widgets: CoreWidget[]) {
    this._core = widgets;
  }

  get core () {
    return this._core;
  }

  register (widgets: Widget[] | AsideGroup[]) {
    this._widgets = widgets;
  }
}

export default Free;
