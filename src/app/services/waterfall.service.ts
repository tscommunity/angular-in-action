import {Injectable} from "@angular/core";
import {Waterfall, WaterfallItem} from "../models/waterfall";


@Injectable({
  providedIn: "root"
})
export class WaterfallService {

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
    const newWidth = (waterfallWidth - verticalGap * (columnCount + 1) - waterfallWidth * columnCount) / columnCount + waterfallWidth;
    let [left, top] = [verticalGap, horizontalGap];

    const fallsGrid: WaterfallItem[][] = [];
    const fallsCopy = Array.from(falls);
    while (fallsCopy.length > 0) {
      fallsGrid.push(fallsCopy.splice(0, columnCount));
    }

    fallsGrid.forEach((row, rowIndex) => {
      row.forEach((fall, colIndex) => {
        fall.adjustedWidth = newWidth;
        left = verticalGap + (fall.adjustedWidth + verticalGap) * colIndex;
        if (rowIndex === 0) {
          top = horizontalGap;
        } else {
          // tslint:disable-next-line:no-non-null-assertion
          top = fallsGrid[rowIndex - 1][colIndex].top! + fallsGrid[rowIndex - 1][colIndex].height + horizontalGap;
        }

        fall.left = left;
        fall.top = top;
      });
    });

    return fallsGrid;
  }
}
