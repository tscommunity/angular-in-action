import {Component, ElementRef, OnDestroy, OnInit} from "@angular/core";
import {WaterfallItem} from "../../models/waterfall";
import {WaterfallService} from "../../services/waterfall.service";

@Component({
  selector: "aia-waterfall",
  templateUrl: "./waterfall.component.html",
  styleUrls: ["./waterfall.component.scss"]
})
export class WaterfallComponent implements OnInit, OnDestroy {

  width = 0;

  height = 0;

  horizontalGap = 10;

  verticalGap = 10;

  falls: WaterfallItem[] = [];

  constructor(private elementRef: ElementRef<HTMLElement>,
              private waterfallService: WaterfallService) {
    this.mockFalls();
  }

  private mockFalls(): void {
    const width = 330;

    for (let i = 0; i < 100; i++) {
      const height = Math.max(Number((Math.random() * 300).toFixed(0)), 50);
      this.falls.push({width, height, adjustedWidth: width});
    }
  }

  ngOnInit(): void {
    this.fall();

    window.addEventListener("resize", () => this.fall());
  }

  fall(): void {
    this.width = this.elementRef.nativeElement.clientWidth;
    console.log(`Initial width: ${this.width}`);
    let items = this.waterfallService.fall(this, this.falls);
    const heights: number[] = [];
    items.forEach(row => row.forEach((item, col) => {
      heights[col] = this.horizontalGap + item.height + (heights[col] || 0);
    }));

    this.height = Math.max(...heights) + this.horizontalGap;
    this.elementRef.nativeElement.style.height = `${this.height}px`;

    /**
     * Tips:
     * Because of setting height of the container element,
     * the parent element (generally is document.body) may overflow in vertical,
     * and the width of container element is subjected changed,
     * so here need to recalculate the adjusted width and position.
     */
    const newWidth = this.elementRef.nativeElement.clientWidth;
    const diffWidth = this.width - newWidth;
    console.log(`New width: ${newWidth}`);
    if (diffWidth > 0) {
      console.log(`Recalculate size and position.`);
      const offset = diffWidth / items[0].length;
      items.forEach((row) => row.forEach((col, idx) => {
        col.adjustedWidth -= offset;
        // tslint:disable-next-line:no-non-null-assertion
        col.left! -= idx * offset;
      }));
    }

    this.falls = items.reduce((pr, cr) => pr.concat(cr), []);
    items = [];
    items.splice(0);
  }

  public ngOnDestroy(): void {
    this.falls = [];
  }
}
