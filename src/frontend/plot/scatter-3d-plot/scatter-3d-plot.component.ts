import { Component } from "@angular/core";
import { PlotComponent } from "../plot.component";

@Component({
    selector: "scatter-3d-plot",
    templateUrl: "../plot.component.html",
    styleUrls: ["../plot.component.scss"]
})
export class Scatter3dPlotComponent extends PlotComponent {
    protected calculateData(): any {
        const max = this.sliderControl.value * (this.dataFrame.columns.length - 1);
        return [{
            opacity:0.8,
            color:"rgb(300,100,200)",
            mode: "markers",
            type: "scatter3d",
            x: this.dataFrame.x.slice(0, max),
            y: this.dataFrame.y.slice(0, max),
            z: this.dataFrame.z.slice(0, max)
        }];        
    }
}