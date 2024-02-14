import { Item, LayoutItem, Margin, Subscription } from "@/components/types";
import {
  ItemClass,
  getHeightFromPx,
  getWidthFromPx,
  getXFromLeft,
  getYFromTop,
} from "@/components/item.utils";

type Defaults = {
  numberOfCols: number;
  useCssTransforms: boolean;
  compact: boolean;
  margin: Margin;
  autoHeight: boolean;
  width: number;
  height: number;
  rowHeight: number | boolean;
  maxRowHeight: number | boolean;
  minRowHeight: number | boolean;
  colWidth: number | boolean;
  maxColWidth: number | boolean;
  minColWidth: number | boolean;
  aspectRatio: number | `${number}/${number}`;
  alignContainer: boolean;
  items: LayoutItem[];
};

export const DEFAULTS: Defaults = {
  numberOfCols: 12,
  useCssTransforms: false,
  compact: true,
  margin: { x: 10, y: 10 },
  autoHeight: true,
  width: 400,
  height: 400,
  rowHeight: false,
  maxRowHeight: false,
  minRowHeight: false,
  colWidth: false,
  maxColWidth: false,
  minColWidth: false,
  aspectRatio: 1,
  alignContainer: false,
  items: [],
};

export type Props = Partial<
  Omit<Defaults, "autoHeight" | "width" | "height">
> & { breakpoint: string; breakpointWidth?: number; debug?: boolean };

export const PROPS_DEFAULTS:
  Omit<Props, "breakpoint" | "margin" | "items"> & { margin: () => Margin, items: () => LayoutItem[] }
  = {
  numberOfCols: DEFAULTS.numberOfCols,
  useCssTransforms: DEFAULTS.useCssTransforms,
  compact: DEFAULTS.compact,
  debug: false,
  margin: () => DEFAULTS.margin,
  rowHeight: DEFAULTS.rowHeight,
  maxRowHeight: DEFAULTS.maxRowHeight,
  minRowHeight: DEFAULTS.minRowHeight,
  colWidth: DEFAULTS.colWidth,
  maxColWidth: DEFAULTS.maxColWidth,
  minColWidth: DEFAULTS.minColWidth,
  aspectRatio: DEFAULTS.aspectRatio,
  alignContainer: DEFAULTS.alignContainer,
  items: () => DEFAULTS.items,
};

export class LayoutClass {
  private _breakpoint: string;
  private _breakpointWidth?: number;
  private _numberOfCols: Defaults["numberOfCols"];
  private _useCssTransforms: Defaults["useCssTransforms"];
  private _compact: Defaults["compact"];
  private _margin: Defaults["margin"];
  private _autoHeight: Defaults["autoHeight"];
  private _width: Defaults["width"];
  private _height: Defaults["height"];
  private _rowHeight: Defaults["rowHeight"];
  private _maxRowHeight: Defaults["maxRowHeight"];
  private _minRowHeight: Defaults["minRowHeight"];
  private _colWidth: Defaults["colWidth"];
  private _maxColWidth: Defaults["maxColWidth"];
  private _minColWidth: Defaults["minColWidth"];
  private _aspectRatio: Defaults["aspectRatio"];
  private _alignContainer: Defaults["alignContainer"];
  private _itemBeingDragged = false;
  private _itemBeingResized = false;
  private _initalItemIds: Array<number | string> = [];
  private _dashItems: ItemClass[] = [];
  private _dragStartListeners: Subscription[] = [];
  private _dragListeners: Subscription[] = [];
  private _dragEndListeners: Subscription[] = [];
  private _resizeStartListeners: Subscription[] = [];
  private _resizeListeners: Subscription[] = [];
  private _resizeEndListeners: Subscription[] = [];

  constructor({
    breakpoint,
    breakpointWidth,
    numberOfCols,
    useCssTransforms = DEFAULTS.useCssTransforms,
    compact = DEFAULTS.compact,
    margin = DEFAULTS.margin,
    autoHeight = DEFAULTS.autoHeight,
    width = DEFAULTS.width,
    height = DEFAULTS.height,
    rowHeight = DEFAULTS.rowHeight,
    maxRowHeight = DEFAULTS.maxRowHeight,
    minRowHeight = DEFAULTS.minRowHeight,
    colWidth = DEFAULTS.colWidth,
    maxColWidth = DEFAULTS.maxColWidth,
    minColWidth = DEFAULTS.minColWidth,
    aspectRatio = DEFAULTS.aspectRatio,
    alignContainer = DEFAULTS.alignContainer,
    initialItems,
  }: Required<Pick<Defaults, "numberOfCols">> & {
    breakpoint: string;
    breakpointWidth?: number;
    initialItems?: Item[];
  } & Partial<Defaults>) {
    this._breakpoint = breakpoint;
    this._breakpointWidth = breakpointWidth;
    this._numberOfCols = numberOfCols;
    this._useCssTransforms = useCssTransforms;
    this._compact = compact;
    this._margin = margin;
    this._autoHeight = autoHeight;
    this._width = width;
    this._height = height;
    this._rowHeight = rowHeight;
    this._maxRowHeight = maxRowHeight;
    this._minRowHeight = minRowHeight;
    this._colWidth = colWidth;
    this._maxColWidth = maxColWidth;
    this._minColWidth = minColWidth;
    this._aspectRatio = aspectRatio;
    this._alignContainer = alignContainer;

    if (typeof initialItems !== "undefined") {
      this._initalItemIds = initialItems.map((item) => {
        return item.id;
      });
    }
  }
  get breakpoint() {
    return this._breakpoint;
  }
  set breakpoint(b: string) {
    this._breakpoint = b;
  }
  get breakpointWidth() {
    return this._breakpointWidth;
  }
  set breakpointWidth(bw: number | undefined) {
    this._breakpointWidth = bw;
  }
  get margin() {
    return this._margin;
  }
  set margin(m: Defaults["margin"]) {
    this._margin = m;
  }
  get width() {
    return this.calculateWidth();
  }
  set width(w: Defaults["width"]) {
    this._width = w;
    this.updateDashItems();
  }
  get height() {
    if (this.autoHeight) {
      return this.calculateHeight();
    }
    return this._height;
  }
  set height(h: Defaults["height"]) {
    this._height = h;
  }
  get numberOfCols() {
    return this._numberOfCols;
  }
  set numberOfCols(n: Defaults["numberOfCols"]) {
    this._numberOfCols = n;
    this.updateDashItems();
  }
  get autoHeight() {
    return this._autoHeight;
  }
  set autoHeight(ah: Defaults["autoHeight"]) {
    this._autoHeight = ah;
  }
  get maxRowHeight() {
    return this._maxRowHeight;
  }
  set maxRowHeight(mrh: Defaults["maxRowHeight"]) {
    this._maxRowHeight = mrh;
    this.updateDashItems();
  }
  get minRowHeight() {
    return this._minRowHeight;
  }
  set minRowHeight(mrh: Defaults["minRowHeight"]) {
    this._minRowHeight = mrh;
    this.updateDashItems();
  }
  get rowHeight() {
    let rH = 0;
    if (typeof this._rowHeight == "number") {
      return this._rowHeight;
    }

    if (typeof this._aspectRatio === "string") {
      const [width, height] = this._aspectRatio.split("/");
      rH = ((+this.colWidth) / +width) * +height;
    } else if (typeof this._aspectRatio === "number") {
      rH = ((+this.colWidth) / this._aspectRatio)
    }

    if (typeof this.maxRowHeight == "number") {
      if (rH > this.maxRowHeight) {
        rH = this.maxRowHeight;
      }
    }
    if (typeof this.minRowHeight == "number") {
      if (rH < this.minRowHeight) {
        rH = this.minRowHeight;
      }
    }
    return rH;
  }
  set rowHeight(rh: number) {
    this._rowHeight = rh;
    this.updateDashItems();
  }

  set maxColWidth(mcw: Defaults["maxColWidth"]) {
    this._maxColWidth = mcw;
    this.updateDashItems();
  }
  get maxColWidth() {
    return this._maxColWidth;
  }
  set minColWidth(mcw: Defaults["minColWidth"]) {
    this._minColWidth = mcw;
    this.updateDashItems();
  }
  get minColWidth() {
    return this._minColWidth;
  }
  set colWidth(cw: number) {
    this._colWidth = cw;
  }
  get colWidth() {
    let colWidthCalc = 0;

    if (typeof this._colWidth == "number") {
      colWidthCalc = this._colWidth;
    } else {
      colWidthCalc =
        (this.width - this.margin.x * (this.alignContainer ? this.numberOfCols - 1 : this.numberOfCols + 1)) /
        this.numberOfCols;
    }

    if (typeof this.maxColWidth == "number") {
      if (colWidthCalc > this.maxColWidth) {
        colWidthCalc = this.maxColWidth;
      }
    }
    if (typeof this.minColWidth == "number") {
      if (colWidthCalc < this.minColWidth) {
        colWidthCalc = this.minColWidth;
      }
    }
    return colWidthCalc;
  }
  set aspectRatio(ar: Defaults["aspectRatio"]) {
    this._aspectRatio = ar;
  }
  get aspectRatio() {
    return this._aspectRatio;
  }
  set alignContainer(ac: Defaults["alignContainer"]) {
    this._alignContainer = ac;
  }
  get alignContainer() {
    return this._alignContainer;
  }
  //Item Methods
  get itemBeingDragged() {
    return this._itemBeingDragged;
  }
  set itemBeingDragged(ibd: boolean) {
    this._itemBeingDragged = ibd;
  }
  get itemBeingResized() {
    return this._itemBeingResized;
  }
  set itemBeingResized(ibr: boolean) {
    this._itemBeingResized = ibr;
  }
  get placeholder() {
    return this.getDashItemById("-1Placeholder");
  }
  set placeholder(p) {
    this.placeholder = p;
  }
  get compact() {
    return this._compact;
  }
  set compact(c: Defaults["compact"]) {
    this._compact = c;
  }
  get useCssTransforms() {
    return this._useCssTransforms;
  }
  set useCssTransforms(uct: Defaults["useCssTransforms"]) {
    this._useCssTransforms = uct;
  }
  //used when colWidth is defined (i.e. not looking or caring about width of window )
  calculateWidth() {
    if (typeof this._colWidth == "number" && typeof this.colWidth == "number") {
      return (this.numberOfCols * (this.colWidth + this.margin.x) + (this.alignContainer ? -this.margin.x : this.margin.x));
    }
    return this._width;
  }
  //Reactive Methods
  calculateHeight() {
    let maxY = 0;
    let bottomY = 0;
    for (const item of this._dashItems) {
      bottomY = item.y + item.height;
      if (bottomY > maxY) {
        maxY = bottomY;
      }
    }
    return Math.round(maxY * (this.rowHeight + this.margin.y) + (this.alignContainer ? -this.margin.y : this.margin.y));
  }
  //DashItem Methods
  addDashItem(d: ItemClass) {
    this._dashItems.push(d);

    this.updateDashItems();
    //Drag Subscriptions
    const unDragStart = d.onMoveStart.subscribe((item) => {
      this.itemDragging(item);
    });
    this._dragStartListeners.push({
      id: d.id,
      unsubscribe: unDragStart,
    });
    const unDrag = d.onMove.subscribe((item) => {
      this.itemDragging(item);
    });
    this._dragListeners.push({
      id: d.id,
      unsubscribe: unDrag,
    });
    const unDragEnd = d.onMoveEnd.subscribe((item) => {
      this.itemDraggingComplete(item);
    });
    this._dragEndListeners.push({ id: d.id, unsubscribe: unDragEnd });
    //Resize Subscirptions
    const unResizeStart = d.onResizeStart.subscribe((item) => {
      this.itemResizing(item);
    });
    this._resizeStartListeners.push({
      id: d.id,
      unsubscribe: unResizeStart,
    });
    const unResize = d.onResize.subscribe((item) => {
      this.itemResizing(item);
    });
    this._resizeListeners.push({
      id: d.id,
      unsubscribe: unResize,
    });
    const unResizeEnd = d.onResizeEnd.subscribe((item) => {
      this.itemResizingComplete(item);
    });
    this._resizeEndListeners.push({
      id: d.id,
      unsubscribe: unResizeEnd,
    });

    //Check that the added item has not caused a collision and if so move the others.
    //Only do this on items added after initialisation
    if (!this._initalItemIds.includes(d.id)) {
      const items = this.compactLayout(this.items);
      this.syncItems(items);
    }
  }
  removeDashItem(d: ItemClass) {
    let index = this._dashItems.findIndex((item) => {
      return item.id === d.id;
    });
    if (index >= 0) {
      this._dashItems.splice(index, 1);
    }
    //Remove Event Listerners
    index = this._dragStartListeners.findIndex((item) => {
      return item.id === d.id;
    });
    if (index >= 0) {
      this._dragStartListeners[index].unsubscribe();
      this._dragStartListeners.splice(index, 1);
    }
    index = this._dragListeners.findIndex((item) => {
      return item.id === d.id;
    });
    if (index >= 0) {
      this._dragListeners[index].unsubscribe();
      this._dragListeners.splice(index, 1);
    }
    index = this._dragEndListeners.findIndex((item) => {
      return item.id === d.id;
    });
    if (index >= 0) {
      this._dragEndListeners[index].unsubscribe();
      this._dragEndListeners.splice(index, 1);
    }
    //Remove Drag Listerners
    index = this._resizeStartListeners.findIndex((item) => {
      return item.id === d.id;
    });
    if (index >= 0) {
      this._resizeStartListeners[index].unsubscribe();
      this._resizeStartListeners.splice(index, 1);
    }
    index = this._resizeListeners.findIndex((item) => {
      return item.id === d.id;
    });
    if (index >= 0) {
      this._resizeListeners[index].unsubscribe();
      this._resizeListeners.splice(index, 1);
    }
    index = this._resizeEndListeners.findIndex((item) => {
      return item.id === d.id;
    });
    if (index >= 0) {
      this._resizeEndListeners[index].unsubscribe();
      this._resizeEndListeners.splice(index, 1);
    }
    //Remove from initial Item Id check if it existed. This way the item can be added again and compacted
    const initialItemIdIndex = this._initalItemIds.findIndex((id) => {
      id === d.id;
    });
    if (initialItemIdIndex > -1) {
      this._initalItemIds.splice(initialItemIdIndex, 1);
    }

    //Compact layout after removal
    const items = this.compactLayout(this.items);
    this.syncItems(items);
  }
  getDashItemById(id: string | number) {
    const index = this._dashItems.findIndex((item) => {
      return item.id === id;
    });
    if (index >= 0) {
      return this._dashItems[index];
    }
    return null;
  }
  updateDashItems() {
    this._dashItems.forEach((item) => {
      item.colWidth = this.colWidth as number;
      item.rowHeight = this.rowHeight as number;
      item.margin = this.margin;
      item.alignContainer = this.alignContainer;
    });
  }
  //Item Methods
  get items() {
    const items: Item[] = [];
    this._dashItems.forEach((dashItem) => {
      items.push(dashItem.toItem());
    });
    return items;
  }
  itemDragging(item: Item) {
    if (!this.itemBeingDragged) {
      this.placeholder!.x = item.x;
      this.placeholder!.y = item.y;
      this.placeholder!.width = item.width;
      this.placeholder!.height = item.height;
      this.itemBeingDragged = true;
    }
    //Take a copy of items
    const itemsCopy = JSON.parse(JSON.stringify(this.items)) as Item[];
    //Remove the item being dragged as the placeholder takes its place. Otherwise the item will snap while being dragged.
    let items = itemsCopy.filter((i) => {
      return i.id !== item.id;
    });
    const placeholderIndex = items.findIndex((i) => {
      return i.id === this.placeholder!.id;
    });
    //items = this.correctBounds(items);
    items = this.moveItem(
      items,
      items[placeholderIndex],
      getXFromLeft(item.left!, this.colWidth as number, this.margin, this.alignContainer),
      getYFromTop(item.top!, this.rowHeight, this.margin, this.alignContainer),
      true
    );
    items = this.compactLayout(items);
    this.syncItems(items);
  }
  itemDraggingComplete(item: Item) {
    this.itemBeingDragged = false;
    const dashItem = this.getDashItemById(item.id);
    if (dashItem) {
      dashItem.x = this.placeholder!.x;
      dashItem.y = this.placeholder!.y;
    }
    this.placeholder!.x = 0;
    this.placeholder!.y = 0;
    this.placeholder!.width = 0;
    this.placeholder!.height = 0;
  }
  itemResizing(item: Item) {
    this.itemBeingResized = true;
    this.placeholder!.minWidth = item.minWidth as number | boolean;
    this.placeholder!.maxWidth = item.maxWidth as number | boolean;
    this.placeholder!.minHeight = item.minHeight as number | boolean;
    this.placeholder!.maxHeight = item.maxHeight as number | boolean;
    this.placeholder!.x = getXFromLeft(
      item.left!,
      this.colWidth as number,
      this.margin, this.alignContainer
    );
    this.placeholder!.y = getYFromTop(item.top!, this.rowHeight, this.margin, this.alignContainer);
    this.placeholder!.width = getWidthFromPx(
      item.widthPx!,
      this.colWidth as number,
      this.margin
    );
    this.placeholder!.height = getHeightFromPx(
      item.heightPx!,
      this.rowHeight,
      this.margin
    );
    //Take a copy of items
    const itemsCopy = JSON.parse(JSON.stringify(this.items)) as Item[];
    //Remove the item being resized as the placeholder takes its place. Otherwise the item will snap while being resized.
    let items = itemsCopy.filter((i) => {
      return i.id !== item.id;
    });
    const placeholderIndex = items.findIndex((i) => {
      return i.id === this.placeholder!.id;
    });
    items = this.moveItem(
      items,
      items[placeholderIndex],
      getXFromLeft(item.left!, this.colWidth as number, this.margin, this.alignContainer),
      getYFromTop(item.top!, this.rowHeight, this.margin, this.alignContainer),
      true
    );
    items = this.compactLayout(items);
    this.syncItems(items);
  }
  itemResizingComplete(item: Item) {
    this.itemBeingResized = false;
    const dashItem = this.getDashItemById(item.id);
    if (dashItem) {
      dashItem.x = this.placeholder!.x;
      dashItem.y = this.placeholder!.y;
      dashItem.width = this.placeholder!.width;
      dashItem.height = this.placeholder!.height;
    }
    this.placeholder!.x = 0;
    this.placeholder!.y = 0;
    this.placeholder!.width = 0;
    this.placeholder!.height = 0;
  }
  //Collision Utils
  checkForCollision(d1: Item, d2: Item) {
    if (d1.id === d2.id) {
      return false;
    }
    if (d1.x + d1.width <= d2.x) {
      return false;
    }
    if (d1.x >= d2.x + d2.width) {
      return false;
    }
    if (d1.y + d1.height <= d2.y) {
      return false;
    }
    if (d1.y >= d2.y + d2.height) {
      return false;
    }
    return true;
  }
  getFirstCollision(items: Item[], d: Item) {
    for (const i of items) {
      if (this.checkForCollision(d, i)) {
        return i;
      }
    }
    return null;
  }
  getAllCollisions(items: Item[], d: Item) {
    return items.filter((item) => this.checkForCollision(item, d));
  }
  //Layout and Item Moving Methods
  correctItemBounds(item: Item) {
    if (item.x + item.width > this.numberOfCols) {
      item.x = this.numberOfCols - item.width;
    }
    if (item.x < 0) {
      item.x = 0;
    }
    if (item.y < 0) {
      item.y = 0;
    }
    if (item.width > this.numberOfCols) {
      item.x = 0;
      item.width = this.numberOfCols;
    }
    return item;
  }
  correctBounds(items: Item[]) {
    for (let i = 0; i < items.length; i++) {
      items[i] = this.correctItemBounds(items[i]);
    }
    return items;
  }
  getLockedItems() {
    return this.items.filter((item) => item.locked);
  }
  compactLayout(items: Item[]) {
    const sorted = this.sortItems(items);
    const compareWith = this.getLockedItems();
    const out = Array(items.length) as Item[];

    for (let i = 0; i < sorted.length; i++) {
      let l = sorted[i];
      if (!l.locked) {
        l = this.compactItem(compareWith, l);
        // Add to comparison array. We only collide with items before this one.
        compareWith.push(l);
      }

      // Add to output array to make sure they still come out in the right order.
      const index = items.findIndex((item) => {
        return item.id === l.id;
      });
      out[index] = l;
      // Clear moved flag, if it exists.
      l.moved = false;
    }
    return out;
  }
  compactItem(items: Item[], d: Item) {
    if (this.compact) {
      while (d.y > 0 && !this.getFirstCollision(items, d)) {
        d.y--;
      }
    }
    let collides;
    while ((collides = this.getFirstCollision(items, d))) {
      d.y = collides.y + collides.height;
    }
    return d;
  }
  sortItems(items: Item[], reverse?: boolean) {
    const i = JSON.parse(JSON.stringify(items)) as Item[];
    i.sort((a, b) => {
      if (a.y > b.y || (a.y === b.y && a.x > b.x)) {
        return 1;
      }
      return -1;
    });
    if (reverse) {
      i.reverse();
    }
    return i;
  }
  moveItem(
    items: Item[],
    d: Item,
    x: number,
    y: number,
    isUserAction?: boolean
  ) {
    if (d.locked) {
      return items;
    }

    const movingUp: boolean = d.y > y;
    d.x = x;
    d.y = y;
    d.moved = true;
    d = this.correctItemBounds(d);
    const sorted = this.sortItems(items, movingUp);
    const collisions = this.getAllCollisions(sorted, d);
    for (const collision of collisions) {
      if (collision.moved) {
        continue;
      }
      // This makes it feel a bit more precise by waiting to swap for just a bit when moving up.
      if (d.y > collision.y && d.y - collision.y > collision.height / 4) {
        continue;
      }
      const collisionIndex = items.findIndex((item) => {
        return item.id === collision.id;
      });
      if (collision.locked) {
        items = this.moveItemFromCollision(
          items,
          items[collisionIndex],
          d,
          isUserAction
        );
      } else {
        items = this.moveItemFromCollision(
          items,
          d,
          items[collisionIndex],
          isUserAction
        );
      }
    }
    return items;
  }
  moveItemFromCollision(
    items: Item[],
    colllidesWith: Item,
    itemToMove: Item,
    isUserAction?: boolean
  ) {
    if (isUserAction) {
      const fakeItem: Item = {
        id: "-1fakeItem",
        x: itemToMove.x,
        y: itemToMove.y,
        width: itemToMove.width,
        maxWidth: itemToMove.maxWidth,
        minWidth: itemToMove.minWidth,
        height: itemToMove.height,
        maxHeight: itemToMove.maxHeight,
        minHeight: itemToMove.minHeight,
      };
      fakeItem.y = Math.max(colllidesWith.y - itemToMove.height, 0);
      if (!this.getFirstCollision(items, fakeItem)) {
        return this.moveItem(items, itemToMove, itemToMove.x, fakeItem.y);
      }
    }
    return this.moveItem(items, itemToMove, itemToMove.x, itemToMove.y + 1);
  }
  syncItems(items: Item[]) {
    items.forEach((i) => {
      const dashItem = this.getDashItemById(i.id);
      dashItem!.fromItem(i);
    });
  }
}
