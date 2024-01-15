declare module "vue3-responsive-dash" {
  import { ComponentOptionsMixin, ComputedOptions, DefineComponent, MethodOptions } from "vue";

  type Item = {
    id: number | string;
    x: number;
    y: number;
    top?: number;
    left?: number;
    width: number;
    maxWidth: number | boolean;
    minWidth: number | boolean;
    widthPx?: number;
    height: number;
    maxHeight: number | boolean;
    minHeight: number | boolean;
    heightPx?: number;
    draggable?: boolean;
    resizable?: boolean;
    moved?: boolean;
    locked?: boolean;
  };

  type DashboardProps = {
    /** UUID for the dashboard */
    id: string;
    /** @default true */
    autoHeight?: boolean;
  };

  type DashboardEmits = {
    currentBreakpointUpdated: (breakpoint?: string) => void;
  };

  const Dashboard: DefineComponent<
    DashboardProps,
    object,
    object,
    ComputedOptions,
    MethodOptions,
    ComponentOptionsMixin,
    ComponentOptionsMixin,
    DashboardEmits
  >;

  type DashLayoutProps = {
    /** Any uniq string, typically describing the breakpoint Size (i.e. xl, lg etc) */
    breakpoint: string;
    /**
     * Number of columns allowed
     * @default 12
     */
    numberOfCols?: number;
    /**
     * Distance in pixels between DashItems
     * @default { x: 10, y: 10 }
     */
    margin?: {
      x: number;
      y: number;
    }
    /**
     * Width used to determine which layout is most appropriate for the screen size
     * @default undefined
     */
    breakpointWidth?: number;
    /**
     * Use translate3d instead of direct top left css properties
     * @default false
     */
    useCssTransforms?: boolean;
    /**
     * Automatically move items up if there is space available
     * @default true
     */
    compact?: boolean;
    /**
     * When set to a number the column width is statically set to this value
     * @default false
     */
    colWidth?: boolean | number;
    /**
     * When set to a number the colWidth will never be greater than this number
     * @default false
     */
    maxColWidth?: boolean | number;
    /**
     * When set to a number the colWidth will never be less than this number
     * @default false
     */
    minColWidth?: boolean | number;
    /**
     * When set to a number the row height will be set to this number (as opposed to being set to the colWidth to keep the items square)
     * @default false
     */
    rowHeight?: boolean | number;
    /**
     * When set to a number the rowHeight will never be greater than this number
     * @default false
     */
    maxRowHeight?: boolean | number;
    /**
     * When set to a number the rowHeight will never be less than this number
     * @default false
     */
    minRowHeight?: boolean | number;
  };

  // TODO: Add slots
  const DashLayout: DefineComponent<DashLayoutProps>;

  type DashItemProps = {
    /** UUID for the item */
    id: string;
    /**
     * Horizontal position of the item (in col units)
     * @default 0
     */
    x?: number;
    /**
     * Vertical position of the item (in col units)
     * @default 0
     */
    y?: number;
    /**
     * Width (in col units)
     * @default 1
     */
    width?: number;
    /**
     * Max Width (in col units). When not a number it is ignored
     * @default false
     */
    maxWidth?: number | boolean;
    /**
     * Min Width (in col units). When not a number it is ignored
     * @default 1
     */
    minWidth?: number | boolean;
    /**
     * Height (in col units)
     * @default 1
     */
    height?: number;
    /**
     * Max Height (in col units). When not a number it is ignored
     * @default false
     */
    maxHeight?: number | boolean;
    /**
     * Min Height (in col units). When not a number it is ignored
     * @default 1
     */
    minHeight?: number | boolean;
    /**
     * If the item can be dragged
     * @default true
     */
    draggable?: boolean;
    /**
     * If the item can be resized
     * @default true
     */
    resizable?: boolean;
    /**
     * The edges it can be resized (experimental for all options apart from bottom right)
     * @default "bottom right"
     */
    resizeEdges?: "top left" | "top right" | "bottom left" | "bottom right";
    /**
     * The area where resize can be selected on the item
     * @default 8
     */
    resizeHandleSize?: number;
    /**
     * The zIndex applied to each resizeable area to make sure it is above the items in the main slot
     * @default 1
     */
    resizableZIndex?: number;
    /**
     * The amount of time in ms required to hold the item before it can be moved
     * @default 0
     */
    moveHold?: number;
    /**
     * The amount of time in ms required to hold the item before it can be resize
     * @default 0
     */
    resizeHold?: number;
    /**
     * Custom Selector which the drag/move event can start from
     * @default null
     */
    dragAllowFrom?: string | null;
    /**
     * Custom Selector to prevent actions from starting if the pointer went down on an element matching the given selector or HTMLElement
     * @default null
     */
    dragIgnoreFrom?: string | null;
    /**
     * A Locked item will remain in position and will not move up when there is space above. It is also not possible to move or resize a locked item
     * @default false
     */
    locked?: boolean;
  };

  type DashItemEmits = {
    "update:x": (x: DashItemProps["x"]) => void;
    "update:y": (y: DashItemProps["y"]) => void;
    "update:width": (width: DashItemProps["width"]) => void;
    "update:height": (height: DashItemProps["height"]) => void;
    moveStart: (item: Item) => void;
    moving: (item: Item) => void;
    moveEnd: (item: Item) => void;
    resizeStart: (item: Item) => void;
    resizing: (item: Item) => void;
    resizeEnd: (item: Item) => void;
    hoverStart: (item: Item) => void;
    hoverEnd: (item: Item) => void;
  };

  // TODO: Add slots
  const DashItem: DefineComponent<
    DashItemProps,
    object,
    object,
    ComputedOptions,
    MethodOptions,
    ComponentOptionsMixin,
    ComponentOptionsMixin,
    DashItemEmits
  >;

  export { Dashboard, DashLayout, DashItem };
}
