import { DashboardLayout, LayoutItem } from "@/components/types";
import { ref } from "vue";

type NewItem = {
  id: LayoutItem["id"];
  parameters: {
    x?: LayoutItem["parameters"]["x"];
    y?: LayoutItem["parameters"]["y"];
    width: LayoutItem["parameters"]["width"];
    height: LayoutItem["parameters"]["height"];
  };
  settings?: LayoutItem["settings"];
};

function useDashboard(layouts: DashboardLayout[]) {
  const layoutList = ref(layouts);

  function _makeItem(item: NewItem, layout: DashboardLayout): LayoutItem | null {
    if (item.parameters.width > layout.numberOfCols) {
      return null;
    }

    if (item.parameters.x !== undefined && item.parameters.y !== undefined) {
      return item as LayoutItem;
    }

    if (!layout.items.length) {
      return {
        ...item,
        parameters: {
          width: item.parameters.width,
          height: item.parameters.height,
          x: 0,
          y: 0,
        },
      };
    }

    const highestItem = layout.items.reduce((acc, item) => {
      if (acc.parameters.y + acc.parameters.height < item.parameters.y + item.parameters.height) {
        return item;
      }
      return acc;
    });

    const columns: number[][] = [...new Array(highestItem.parameters.y + highestItem.parameters.height)]
      .map(() => new Array(layout.numberOfCols).fill(0));

    layout.items.forEach((layoutItem) => {
      for (
        let currentY = layoutItem.parameters.y;
        currentY < layoutItem.parameters.y + layoutItem.parameters.height;
        currentY++
      ) {
        for (
          let currentX = layoutItem.parameters.x;
          currentX < layoutItem.parameters.x + layoutItem.parameters.width;
          currentX++
        ) {
          columns[currentY][currentX] = 1;
        }
      }
    });

    function findEmptyCoords() {
      let x = 0;
      let y = 0;

      for (; y < columns.length; y++) {
        rowCycle: for (; x < columns[y].length; x++) {
          if (columns[y][x] !== 0) {
            if (item.parameters.width === layout.numberOfCols - x) {
              break;
            }
            continue;
          }

          for (let i = y; i < y + item.parameters.height; i++) {
            for (let j = x; j < x + item.parameters.width; j++) {
              if (!columns[i] || !columns[i][j]) {
                continue;
              }

              if (columns[i][j] === 1) {
                continue rowCycle;
              }
            }
          }

          return { x, y };
        }

        x = 0;
      }

      return { x, y };
    }

    return {
      ...item,
      parameters: {
        width: item.parameters.width,
        height: item.parameters.height,
        ...findEmptyCoords(),
      },
    };
  }

  function addItem(
    newItem: NewItem,
    breakpoints: string[] = []
  ) {
    const layoutsForUpdate = layoutList.value.filter((layout) => breakpoints.length === 0 || breakpoints.includes(layout.breakpoint));

    layoutsForUpdate.forEach((layout) => {
      // If all parameters exist simply add the item
      if (newItem.parameters.x !== undefined && newItem.parameters.y !== undefined) {
        layout.items.push(newItem as LayoutItem);
        return;
      }

      const madeItem = _makeItem(newItem, layout);

      if (!madeItem) {
        return;
      }

      layout.items.push(madeItem);
    });
  }

  function removeItem(itemId: LayoutItem["id"], breakpoints: string[] = []) {
    const layoutsForUpdate = layoutList.value.filter((layout) => breakpoints.length === 0 || breakpoints.includes(layout.breakpoint));

    layoutsForUpdate.map((layout) => {
      const itemIndex = layout.items.findIndex((item) => item.id === itemId);

      if (itemIndex === -1) {
        return;
      }

      layout.items.splice(itemIndex, 1);
    });
  }

  return {
    layouts: layoutList,
    addItem,
    removeItem,
  };
}

export default useDashboard;
