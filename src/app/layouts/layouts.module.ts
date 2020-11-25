import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {WaterfallComponent} from "./waterfall/waterfall.component";


@NgModule({
  declarations: [WaterfallComponent],
  imports: [
    CommonModule
  ],
  exports: [WaterfallComponent]
})
export class LayoutsModule {
}
