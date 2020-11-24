import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {WaterfallComponent} from "./layouts/waterfall/waterfall.component";

const routes: Routes = [{
  path: "aia/layouts/waterfall",
  component: WaterfallComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
