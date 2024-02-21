import { Property } from "csstype";

export type Item = {
  id: string;
  x: number;
  y: number;
  top?: number;
  left?: number;
  width: number;
  maxWidth?: number | boolean;
  minWidth?: number | boolean;
  widthPx?: number;
  height: number;
  maxHeight?: number | boolean;
  minHeight?: number | boolean;
  heightPx?: number;
  draggable?: boolean;
  resizable?: boolean;
  moved?: boolean;
  locked?: boolean;
};

export type LayoutParameters = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type LayoutSettings = Partial<Omit<Item, "id" | "x" | "y" | "width" | "height">>;

export type LayoutItem = Pick<Item, "id"> & {
  parameters: LayoutParameters,
  settings?: LayoutSettings;
};

export type DashboardLayout = {
  breakpoint: string;
  numberOfCols: number;
  breakpointWidth: number;
  useCssTransforms?: boolean;
  compact?: boolean;
  margin?: Margin;
  autoHeight?: boolean;
  width?: number;
  height?: number;
  rowHeight?: number | boolean;
  maxRowHeight?: number | boolean;
  minRowHeight?: number | boolean;
  colWidth?: number | boolean;
  maxColWidth?: number | boolean;
  minColWidth?: number | boolean;
  aspectRatio?: number | `${number}/${number}`;
  alignContainer?: boolean;
  placeholderColor?: Property.Color;
  placeholderOpacity?: Property.Opacity;
  items: LayoutItem[];
};

export type Breakpoint = {
  name: string;
  numberOfCols: number;
  setpoint?: number;
};

export type Margin = {
  x: number;
  y: number;
};

export type Subscription = {
  id: number | string;
  unsubscribe: () => void;
};
