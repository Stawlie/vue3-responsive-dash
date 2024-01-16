import type { Margin, Item } from "@/components/types";
import type { ResizeEvent } from "@interactjs/types";
import { SimpleEventDispatcher } from "ste-simple-events";

type Defaults = Required<
  Pick<
    Item,
    | "x"
    | "y"
    | "width"
    | "maxWidth"
    | "minWidth"
    | "height"
    | "maxHeight"
    | "minHeight"
    | "draggable"
    | "resizable"
    | "locked"
  >
> & {
  resizeEdges: "top" | "bottom" | "left" | "right" | "top left" | "top right" | "bottom left" | "bottom right";
  resizableZIndex: number;
  resizeHandleSize: number;
  moveHold: number;
  resizeHold: number;
  dragAllowFrom: string | null;
  dragIgnoreFrom: string | null;
  margin: Margin;
  colWidth: number;
  rowHeight: number;
};

export const PLACEHOLDER_ID = "-1Placeholder";

export const DEFAULTS: Defaults = {
  x: 0,
  y: 0,
  width: 1,
  maxWidth: false,
  minWidth: 1,
  height: 1,
  maxHeight: false,
  minHeight: 1,
  draggable: true,
  resizable: true,
  resizeEdges: "bottom right",
  resizeHandleSize: 8,
  resizableZIndex: 1,
  moveHold: 0,
  resizeHold: 0,
  dragAllowFrom: null,
  dragIgnoreFrom: null,
  locked: false,
  margin: { x: 1, y: 1 },
  colWidth: 1,
  rowHeight: 1,
};

export type Props = {
  modelValue?: Pick<Defaults, "x" | "y" | "width" | "height">
} & Partial<Omit<Defaults, "colWidth" | "rowHeight" | "x" | "y" | "width" | "height">> &
  Pick<Item, "id">;

export const PROPS_DEFAULTS: Required<Omit<Props, "id" | "margin" | "modelValue">> & { modelValue: () => Pick<Defaults, "x" | "y" | "width" | "height">, margin: () => Margin } = {
  modelValue: () => ({
    x: DEFAULTS.x,
    y: DEFAULTS.y,
    width: DEFAULTS.width,
    height: DEFAULTS.height,
  }),
  maxWidth: DEFAULTS.maxWidth,
  minWidth: DEFAULTS.minWidth,
  maxHeight: DEFAULTS.maxHeight,
  minHeight: DEFAULTS.minHeight,
  draggable: DEFAULTS.draggable,
  resizable: DEFAULTS.resizable,
  resizeEdges: DEFAULTS.resizeEdges,
  resizeHandleSize: DEFAULTS.resizeHandleSize,
  resizableZIndex: DEFAULTS.resizableZIndex,
  moveHold: DEFAULTS.moveHold,
  resizeHold: DEFAULTS.resizeHold,
  dragAllowFrom: DEFAULTS.dragAllowFrom,
  dragIgnoreFrom: DEFAULTS.dragIgnoreFrom,
  locked: DEFAULTS.locked,
  margin: () => DEFAULTS.margin,
};

export class ItemClass {
  private readonly _id: number | string;
  private _x: Defaults["x"];
  private _y: Defaults["y"];
  private _width: Defaults["width"];
  private _maxWidth: Defaults["maxWidth"];
  private _minWidth: Defaults["minWidth"];
  private _height: Defaults["height"];
  private _maxHeight: Defaults["maxHeight"];
  private _minHeight: Defaults["minHeight"];
  private _draggable: Defaults["draggable"];
  private _resizable: Defaults["resizable"];
  private _resizeEdges: Defaults["resizeEdges"];
  private _resizeHandleSize: Defaults["resizeHandleSize"];
  private _moveHold: Defaults["moveHold"];
  private _resizeHold: Defaults["resizeHold"];
  private _locked: Defaults["locked"];
  private _margin: Defaults["margin"];
  private _colWidth: Defaults["colWidth"];
  private _rowHeight: Defaults["rowHeight"];
  private _left: number;
  private _top: number;
  private _widthPx: number;
  private _heightPx: number;
  private _moved = false;
  private _hover = false;

  private _moving = false;
  private _resizing = false;
  private _onMoveStartEventDispatcher = new SimpleEventDispatcher<Item>();
  private _onMoveEventDispatcher = new SimpleEventDispatcher<Item>();
  private _onMoveEndEventDispatcher = new SimpleEventDispatcher<Item>();
  private _onResizeStartEventDispatcher = new SimpleEventDispatcher<Item>();
  private _onResizeEventDispatcher = new SimpleEventDispatcher<Item>();
  private _onResizeEndEventDispatcher = new SimpleEventDispatcher<Item>();

  constructor({
    id,
    x = DEFAULTS.x,
    y = DEFAULTS.y,
    width = DEFAULTS.width,
    maxWidth = DEFAULTS.maxWidth,
    minWidth = DEFAULTS.minWidth,
    height = DEFAULTS.height,
    maxHeight = DEFAULTS.maxHeight,
    minHeight = DEFAULTS.minHeight,
    draggable = DEFAULTS.draggable,
    resizable = DEFAULTS.resizable,
    resizeEdges = DEFAULTS.resizeEdges,
    resizeHandleSize = DEFAULTS.resizeHandleSize,
    moveHold = DEFAULTS.moveHold,
    resizeHold = DEFAULTS.resizeHold,
    locked = DEFAULTS.locked,
    margin = DEFAULTS.margin,
    colWidth = DEFAULTS.colWidth,
    rowHeight = DEFAULTS.rowHeight,
  }: Pick<Item, "id"> & Partial<Defaults>) {
    this._id = id;
    this._x = x;
    this._y = y;
    this._width = id === PLACEHOLDER_ID ? 0 : width;
    this._maxWidth = maxWidth;
    this._minWidth = minWidth;
    this._height = height;
    this._maxHeight = maxHeight;
    this._minHeight = minHeight;
    this._draggable = draggable;
    this._resizable = resizable;
    this._resizeEdges = resizeEdges;
    this._resizeHandleSize = resizeHandleSize;
    this._moveHold = moveHold;
    this._resizeHold = resizeHold;
    this._locked = locked;
    this._margin = margin;
    this._colWidth = colWidth;
    this._rowHeight = rowHeight;

    this._left = getLeftFromX(this._x, this._colWidth, this._margin);
    this._top = getTopFromY(this._y, this._rowHeight, this._margin);
    this._widthPx = getWidthInPx(this._width, this._colWidth, this._margin);
    this._heightPx = getHeightInPx(this._height, this._rowHeight, this._margin);
  }
  get id() {
    return this._id;
  }
  get x() {
    return this._x;
  }
  set x(x: number) {
    this._x = x;
    this.updatePositionAndSize();
  }
  get y() {
    return this._y;
  }
  set y(y: number) {
    this._y = y;
    this.updatePositionAndSize();
  }
  get colWidth() {
    return this._colWidth;
  }
  set colWidth(c: number) {
    this._colWidth = c;
    this.updatePositionAndSize();
  }
  get rowHeight() {
    return this._rowHeight;
  }
  set rowHeight(r: number) {
    this._rowHeight = r;
    this.updatePositionAndSize();
  }
  get margin() {
    return this._margin;
  }
  set margin(m: Margin) {
    this._margin = m;
    this.updatePositionAndSize();
  }
  get left() {
    return this._left;
  }
  set left(l: number) {
    if (!this._moving && !this._resizing) {
      this._left = l;
    }
  }
  get top() {
    return this._top;
  }
  set top(t: number) {
    if (!this._moving && !this._resizing) {
      this._top = t;
    }
  }
  get minWidth() {
    return this._minWidth;
  }
  set minWidth(mW: number | boolean) {
    this._minWidth = mW;
  }
  get maxWidth() {
    return this._maxWidth;
  }
  set maxWidth(mW: number | boolean) {
    this._maxWidth = mW;
  }
  get width() {
    return this._width;
  }
  set width(w: number) {
    this._width = w;
    this.checkSizeLimits();
    this.updatePositionAndSize();
  }

  get minHeight() {
    return this._minHeight;
  }
  set minHeight(mW: number | boolean) {
    this._minHeight = mW;
  }
  get maxHeight() {
    return this._maxHeight;
  }
  set maxHeight(mW: number | boolean) {
    this._maxHeight = mW;
  }
  get height() {
    return this._height;
  }
  set height(h: number) {
    this._height = h;
    this.checkSizeLimits();
    this.updatePositionAndSize();
  }
  get widthPx() {
    return this._widthPx;
  }
  set widthPx(w: number) {
    if (!this._resizing) {
      this._widthPx = w;
    }
  }
  get heightPx() {
    return this._heightPx;
  }
  set heightPx(h: number) {
    if (!this._resizing) {
      this._heightPx = h;
    }
  }
  get hover() {
    return this._hover;
  }
  set hover(h: boolean) {
    this._hover = h;
  }
  get moveHold() {
    return this._moveHold;
  }
  set moveHold(dh: number) {
    this._moveHold = dh;
  }
  get resizeHold() {
    return this._resizeHold;
  }
  set resizeHold(rh: number) {
    this._resizeHold = rh;
  }
  get moving() {
    return this._moving;
  }
  get resizing() {
    return this._resizing;
  }
  checkSizeLimits() {
    if (typeof this.maxWidth == "number") {
      if (this.width > this.maxWidth) {
        this.width = this.maxWidth;
      }
    }
    if (typeof this.minWidth == "number") {
      if (this.width < this.minWidth) {
        this.width = this.minWidth;
      }
    }
    if (typeof this.maxHeight == "number") {
      if (this.height > this.maxHeight) {
        this.height = this.maxHeight;
      }
    }
    if (typeof this.minHeight == "number") {
      if (this.height < this.minHeight) {
        this.height = this.minHeight;
      }
    }
  }
  updatePositionAndSize() {
    this.left = getLeftFromX(this.x, this.colWidth, this.margin);
    this.top = getTopFromY(this.y, this.rowHeight, this.margin);
    this.widthPx = getWidthInPx(this.width, this.colWidth, this.margin);
    this.heightPx = getHeightInPx(this.height, this.rowHeight, this.margin);
  }
  get draggable() {
    return this._draggable;
  }
  set draggable(d: boolean) {
    this._draggable = d;
  }
  get resizable() {
    return this._resizable;
  }
  set resizable(r: boolean) {
    this._resizable = r;
  }
  get resizeEdges() {
    return this._resizeEdges;
  }
  set resizeEdges(e: Defaults["resizeEdges"]) {
    this._resizeEdges = e;
  }
  get resizeHandleSize() {
    return this._resizeHandleSize;
  }
  set resizeHandleSize(rhs: number) {
    this._resizeHandleSize = rhs;
  }
  get moved() {
    return this._moved;
  }
  set moved(m: boolean) {
    this._moved = m;
  }
  get locked() {
    return this._locked;
  }
  set locked(l: boolean) {
    this._locked = l;
  }
  toItem() {
    const item = {
      id: this.id,
      x: this.x,
      y: this.y,
      top: this.top,
      left: this.left,
      width: this.width,
      maxWidth: this.maxWidth,
      minWidth: this.minWidth,
      widthPx: this.widthPx,
      height: this.height,
      maxHeight: this.maxHeight,
      minHeight: this.minHeight,
      heightPx: this.heightPx,
      draggable: this.draggable,
      resizable: this.resizable,
      locked: this.locked,
    } as Item;
    return item;
  }
  fromItem(item: Item) {
    this._x = item.x;
    this._y = item.y;
    this._width = item.width;
    this._height = item.height;
    this.updatePositionAndSize();
  }
  //Drag Event Management
  _onMoveStart() {
    this._moving = true;
    this._onMoveStartEventDispatcher.dispatch(this.toItem());
  }
  _onMove(left: number, top: number) {
    this._left += left;
    this._top += top;
    this._onMoveEventDispatcher.dispatch(this.toItem());
  }
  _onMoveEnd() {
    this._moving = false;
    this._onMoveEndEventDispatcher.dispatch(this.toItem());
  }
  get onMoveStart() {
    return this._onMoveStartEventDispatcher.asEvent();
  }
  get onMove() {
    return this._onMoveEventDispatcher.asEvent();
  }
  get onMoveEnd() {
    return this._onMoveEndEventDispatcher.asEvent();
  }
  //ResizeEventManagement
  _onResizeStart() {
    this._resizing = true;
    this._onResizeStartEventDispatcher.dispatch(this.toItem());
  }
  _onResize(event: ResizeEvent) {
    this._left += event.deltaRect!.left;
    this._top += event.deltaRect!.top;
    this._widthPx = event.rect.width;
    this._heightPx = event.rect.height;
    this._onResizeEventDispatcher.dispatch(this.toItem());
  }
  _onResizeEnd() {
    this._resizing = false;
    this._onResizeEndEventDispatcher.dispatch(this.toItem());
  }
  get onResizeStart() {
    return this._onResizeStartEventDispatcher.asEvent();
  }
  get onResize() {
    return this._onResizeEventDispatcher.asEvent();
  }
  get onResizeEnd() {
    return this._onResizeEndEventDispatcher.asEvent();
  }
}

export function getLeftFromX(x: number, colWidth: number, margin: Margin) {
  return Math.round(colWidth * x + (x + 1) * margin.x);
}

export function getXFromLeft(l: number, colWidth: number, margin: Margin) {
  return Math.round((l - margin.x) / (colWidth + margin.x));
}

export function getTopFromY(y: number, rowHeight: number, margin: Margin) {
  return Math.round(rowHeight * y + (y + 1) * margin.y);
}

export function getYFromTop(t: number, rowHeight: number, margin: Margin) {
  return Math.round((t - margin.y) / (rowHeight + margin.y));
}

export function getWidthInPx(w: number, colWidth: number, margin: Margin) {
  return Math.round(colWidth * w + Math.max(0, w - 1) * margin.x);
}

export function getWidthFromPx(
  widthPx: number,
  colWidth: number,
  margin: Margin
) {
  return Math.round((widthPx + margin.x) / (colWidth + margin.x));
}

export function getHeightInPx(h: number, rowHeight: number, margin: Margin) {
  return Math.round(rowHeight * h + Math.max(0, h - 1) * margin.y);
}

export function getHeightFromPx(
  heightPx: number,
  rowHeight: number,
  margin: Margin
) {
  return Math.round((heightPx + margin.y) / (rowHeight + margin.y));
}

export function cssTransform(
  top: number,
  left: number,
  widthPx: number,
  heightPx: number
) {
  const translate = "translate3d(" + left + "px," + top + "px, 0)";
  return {
    transform: translate,
    WebkitTransform: translate,
    MozTransform: translate,
    msTransform: translate,
    OTransform: translate,
    width: widthPx + "px",
    height: heightPx + "px",
  };
}

export function cssTopLeft(
  top: number,
  left: number,
  widthPx: number,
  heightPx: number
) {
  return {
    top: top + "px",
    left: left + "px",
    width: widthPx + "px",
    height: heightPx + "px",
  };
}
