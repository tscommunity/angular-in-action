import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {WaterfallDirective} from "./directives/waterfall.directive";
import {LayoutsModule} from "./layouts/layouts.module";
import { TestAnyComponent } from './test-any/test-any.component';

@NgModule({
  declarations: [
    AppComponent,
    WaterfallDirective,
    TestAnyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
