export interface WaterfallItem {
  width: number;
  height: number;
  left?: number;
  top?: number;
}

export interface Waterfall {
  width: number;
  verticalGap: number;
  horizontalGap: number;
  minColumn?: number;
  maxColumn?: number;
}
