import {
  /* AfterViewChecked, */
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef, /* HostListener, */
  Input,
  OnDestroy,
  OnInit
} from "@angular/core";
import {WaterfallItem} from "../models/waterfall";
import {WaterfallService} from "../services/waterfall.service";
import {fromEvent} from "rxjs";

@Directive({
  selector: "[aiaWaterfall]",
})
export class WaterfallDirective implements OnInit, AfterViewInit, OnDestroy /*, AfterViewChecked */ {

  @Input()
  itemWidth!: number;

  // const children = this.elementRef.nativeElement.children;
  @Input()
  horizontalGap = 10;

  @Input()
  verticalGap = 10;

  falls: WaterfallItem[] = [];

  childElements: HTMLElement[] = [];

  constructor(private elementRef: ElementRef<HTMLElement>,
              /* private changeDetectorRef: ChangeDetectorRef, */
              private waterfallService: WaterfallService) {
  }


  private mockFalls(): void {
    this.falls = Array.from(this.childElements).map(item => ({
      width: item.clientWidth,
      height: item.clientHeight,
      adjustedWidth: item.clientWidth
    }));
  }

  fall(): void {
    const width = this.elementRef.nativeElement.clientWidth;
    // console.log(`Initial width: ${width}`);
    let items = this.waterfallService.fall({
      width,
      verticalGap: this.verticalGap,
      horizontalGap: this.horizontalGap
    }, this.falls);
    const heights: number[] = [];
    items.forEach(row => row.forEach((item, col) => {
      heights[col] = this.horizontalGap + item.height + (heights[col] || 0);
    }));

    const height = Math.max(...heights) + this.horizontalGap;
    this.elementRef.nativeElement.style.height = `${height}px`;

    setTimeout(() => {
      /**
       * Tips:
       * Because of setting height of the container element,
       * the parent element (generally is document.body) may overflow in vertical,
       * and the width of container element is subjected changed,
       * so here need to recalculate the adjusted width and position.
       */
      const newWidth = this.elementRef.nativeElement.clientWidth;
      const diffWidth = width - newWidth;
      // console.log(`New width: ${newWidth}`);
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

      this.childElements.forEach((item, idx) => {
        const fall = this.falls[idx];
        item.style.left = `${fall.left}px`;
        item.style.top = `${fall.top}px`;
        item.style.width = `${fall.adjustedWidth}px`;
      });
    }, 100);
  }


  ngOnInit(): void {

  }

  public ngOnDestroy(): void {
    this.falls = [];
  }

  public ngAfterViewInit(): void {
    this.childElements = Array.from(this.elementRef.nativeElement.children) as HTMLElement[];
    this.mockFalls();
    this.fall();

    // Has a very good performance.
    // But why?
    // window.addEventListener("resize", () => this.fall());

    window.addEventListener("scroll", (evt) => {
      console.log("Window is overflowed!", evt);
    });
    this.watchResize();
  }

  watchResize(): void {
    fromEvent(window, "resize").subscribe(evt => {
      this.fall();
    });
  }

  // Has no effect!!!
  // Cause a lot of console errors output.
  // ngAfterViewChecked(): void {
  //  this.changeDetectorRef.detectChanges();
  // }

  // BAD performance!!! Why???
  // @HostListener("window:resize")
  // onResize(): void {
  //   this.fall();
  //   // or using setTimeout, but is as bad as directly call.
  //   setTimeout(() => this.fall(), 100);
  // }

}
