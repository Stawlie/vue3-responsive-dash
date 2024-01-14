export type Item = {
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
