import type { Breakpoint } from "@/components/types";
import { LayoutClass } from "@/components/layout.utils";

type Defaults = {
  autoHeight: boolean;
  width: number;
};

const DEFAULTS: Defaults = {
  autoHeight: true,
  width: 400,
};

export type Props = Partial<Pick<Defaults, "autoHeight">> & {
  id: string;
};

export const PROPS_DEFAULTS: Partial<Props> = {
  autoHeight: DEFAULTS.autoHeight,
};

export class DashboardClass {
  private readonly _id: string;
  private _layouts: LayoutClass[] = [];
  private _autoHeight: Defaults["autoHeight"];
  private _width: Defaults["width"];

  private _allowRender = false;

  constructor({
    id,
    autoHeight = DEFAULTS.autoHeight,
    width = DEFAULTS.width,
  }: Partial<Defaults> & {
    id: string;
  }) {
    this._id = id;
    this._autoHeight = autoHeight;
    this._width = width;
  }

  get id() {
    return this._id;
  }

  get breakpoints() {
    const bp: Breakpoint[] = [];

    this._layouts.forEach((layout) => {
      bp.push({
        name: layout.breakpoint,
        numberOfCols: layout.numberOfCols,
        setpoint: layout.breakpointWidth,
      });
    });

    return bp.sort((a, b) => {
      if (
        typeof a.setpoint !== "undefined" &&
        typeof b.setpoint !== "undefined"
      ) {
        return a.setpoint - b.setpoint;
      }

      if (typeof a.setpoint === "undefined") {
        return 1;
      }

      return -1;
    });
  }

  get currentBreakpoint() {
    return this.updateCurrentBreakpoint();
  }

  get layouts() {
    return this._layouts;
  }

  set layouts(l: LayoutClass[]) {
    this._layouts = l;
  }

  get autoHeight() {
    return this._autoHeight;
  }

  set autoHeight(ah: Defaults["autoHeight"]) {
    this._autoHeight = ah;
  }

  get width() {
    return this._width;
  }

  set width(w: Defaults["width"]) {
    this._width = w;
    this._allowRender = true;
    this.updateCurrentBreakpoint();
    this.updateLayouts();
  }

  updateCurrentBreakpoint() {
    if (!this._allowRender) {
      return;
    }

    return this.breakpoints.reduce((acc, breakpoint) => {
      if (
        typeof breakpoint.setpoint === "undefined" ||
        breakpoint.setpoint > this.width
      ) {
        return acc;
      }

      return breakpoint.name;
    }, this.breakpoints[0]?.name || "");
  }

  addLayoutInstance(l: LayoutClass) {
    this._layouts.push(l);
  }

  updateLayouts() {
    this._layouts.forEach((layout) => {
      layout.width = this.width;
    });
  }

  removeLayoutInstance(l: LayoutClass) {
    const index = this.layouts.findIndex(
      (layout) => l.breakpoint === layout.breakpoint
    );

    if (index >= 0) {
      this._layouts.splice(index, 1);
    }
  }
}
