import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { PlotModule } from "../plot/plot.module";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "./app.component";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PlotModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
