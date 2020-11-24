import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {WaterfallComponent} from "./layouts/waterfall/waterfall.component";
import {WaterfallDirective} from "./directives/waterfall.directive";

@NgModule({
  declarations: [
    AppComponent,
    WaterfallComponent,
    WaterfallDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
