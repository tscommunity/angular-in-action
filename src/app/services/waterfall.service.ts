import {Injectable} from "@angular/core";
import {Waterfall, WaterfallItem} from "../models/waterfall";


@Injectable({
  providedIn: "root"
})
export class WaterfallService {

  constructor() {
  }

  private static CalcColumnCount(width: number, verticalGap: number, itemWidth: number): number {
    let remainingWidth = width - verticalGap * 2 - itemWidth;
    let columnCount = 1;

    while (remainingWidth >= verticalGap + itemWidth) {
      remainingWidth -= verticalGap + itemWidth;
      columnCount++;
    }

    return columnCount;
  }

  public fall(waterfall: Waterfall, falls: WaterfallItem[]): WaterfallItem[][] {
    const waterfallWidth = waterfall.width;
    const verticalGap = waterfall.verticalGap;
    const horizontalGap = waterfall.horizontalGap;
    const fallWidth = falls[0].width;
    const columnCount = WaterfallService.CalcColumnCount(waterfallWidth, verticalGap, fallWidth);
//    const coordinates: { left: number; top: number }[][] = [];
    let [left, top] = [verticalGap, horizontalGap];

    const fallsGrid: WaterfallItem[][] = [];
    const fallsCopy = Array.from(falls);
    while (fallsCopy.length > 0) {
      fallsGrid.push(fallsCopy.splice(0, columnCount));
    }

    fallsGrid.forEach((row, rowIndex) => {
//      const rowCoordinates: { left: number; top: number }[] = [];
      row.forEach((fall, colIndex) => {
        left = verticalGap + (fall.width + verticalGap) * colIndex;
        if (rowIndex === 0) {
          top = horizontalGap;
        } else {
//          top = coordinates[rowIndex - 1][colIndex].top + fallsGrid[rowIndex - 1][colIndex].height + horizontalGap;
// tslint:disable-next-line:no-non-null-assertion
          top = fallsGrid[rowIndex - 1][colIndex].top! + fallsGrid[rowIndex - 1][colIndex].height + horizontalGap;
        }

        fall.left = left;
        fall.top = top;
//        rowCoordinates.push({left, top});
      });
//      coordinates.push(rowCoordinates);
    });

//    return coordinates;
    return fallsGrid;
  }
}
