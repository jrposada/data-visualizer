import { NgModule } from "@angular/core";

import { PlotComponent } from "./plot/plot.component";

@NgModule({
    declarations: [
        PlotComponent
    ],
    exports: [
        PlotComponent
    ]
})
export class PlotModule { }
