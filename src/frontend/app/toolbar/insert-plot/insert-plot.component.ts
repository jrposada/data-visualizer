import { ChangeDetectionStrategy, Component } from "@angular/core";
import { EPlotType, PlotService } from "../../services/plot/plot.service";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "insert-plot",
    templateUrl: "./insert-plot.component.html",
    styleUrls: ["./insert-plot.component.scss"]
})
export class InsertPlotComponent {
    constructor(private plotService: PlotService) { }

    public addScatter3dPlot() {
        this.plotService.addPlot(EPlotType.Scatter3d);
    }

    public addMesh3dPlot() {
        this.plotService.addPlot(EPlotType.Mesh3d)
    }

    public addSurfacePlot() {
        this.plotService.addPlot(EPlotType.Surface)
    }
}