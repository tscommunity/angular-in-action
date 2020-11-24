import {Component, ElementRef, OnInit} from "@angular/core";
import {Waterfall, WaterfallItem} from "../../models/waterfall";
import {WaterfallService} from "../../services/waterfall.service";

@Component({
  selector: "aia-waterfall",
  templateUrl: "./waterfall.component.html",
  styleUrls: ["./waterfall.component.scss"]
})
export class WaterfallComponent implements OnInit {

  falls: WaterfallItem[] = [];

  constructor(private elementRef: ElementRef,
              private waterfallService: WaterfallService) {
  }

  ngOnInit(): void {
    const width = 330;

    for (let i = 0; i < 100; i++) {
      const height = Number((Math.random() * 300).toFixed(0));
      this.falls.push({width, height});
    }

    this.fall();

    window.addEventListener("resize", () => this.fall());
  }

  fall(): void {
    const waterfallWidth = Number(window.getComputedStyle(this.elementRef.nativeElement).width.replace("px", ""));
    const waterfall: Waterfall = {verticalGap: 10, horizontalGap: 10, width: waterfallWidth};
    this.falls = this.waterfallService.fall(waterfall, this.falls).reduce((pr, cr) => pr.concat(cr), []);
  }
}
