import {TestBed} from "@angular/core/testing";

import {WaterfallService} from "./waterfall.service";
import {Waterfall, WaterfallItem} from "../models/waterfall";

describe("WaterfallService", () => {
  let service: WaterfallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaterfallService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();

    const falls: WaterfallItem[] = [];
    const width = 130;
    const waterfall: Waterfall = {
      verticalGap: 10, horizontalGap: 10,
      width: 1000, height: 100
    };
    for (let i = 0; i < 13; i++) {
      const height = Number((Math.random() * 100).toFixed(0));
      falls.push({width, height, adjustedWidth: width});
    }

    const coordinates = service.fall(waterfall, falls);

    console.log(`Falls:\n${JSON.stringify(falls)}`);
    console.log(`Coordinates:\n${JSON.stringify(coordinates)}`);
  });
});
