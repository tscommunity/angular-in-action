import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";

@Component({
  selector: "aia-test-any",
  templateUrl: "./test-any.component.html",
  styleUrls: ["./test-any.component.scss"],

  // Very important!!!
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestAnyComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  getHeight(): number {
    return Math.max(Math.random() * 100, 50);
  }

}
