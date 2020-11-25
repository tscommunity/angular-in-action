export interface WaterfallItem {
  width: number;
  height: number;
  adjustedWidth: number;
  left?: number;
  top?: number;
}

export interface Waterfall {
  width: number;
  height?: number;
  verticalGap: number;
  horizontalGap: number;
  minColumn?: number;
  maxColumn?: number;
}
