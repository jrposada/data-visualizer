import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PlotComponent } from "../plot.component";

@Component({
    selector: "surface-plot",
    templateUrl: "../plot.component.html",
    styleUrls: ["../plot.component.scss"]
})
export class SurfacePlotComponent extends PlotComponent {
    constructor(matDialog: MatDialog) {
        super(matDialog);
    }

    protected calculateData(): any {
        return [{
            showscale: false,
            colorscale: "Earth",
            x: this.dataFrame.columns.slice(1),
            y: this.dataFrame.rows.slice(0, this.sliderControl.value),
            z: this.dataFrame.array.slice(0, this.sliderControl.value),
            type: "surface"
        }];
    }
}
