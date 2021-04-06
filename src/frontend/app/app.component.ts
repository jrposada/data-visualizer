import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { DataFrame } from "./core";
import { EPlotType, PlotService } from "./services/plot/plot.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnDestroy {
    public get isMesh3dPlot(): boolean { return this.plotType === EPlotType.Mesh3d; }
    public get isScatterdPlot(): boolean { return this.plotType === EPlotType.Scatter3d; }
    public get isSurfacePlot(): boolean { return this.plotType === EPlotType.Surface; }

    public dataFrame: DataFrame = new DataFrame();

    private onAddPlotSubscription: Subscription;
    private plotType: EPlotType;

    constructor(private plotService: PlotService) {
        this.onAddPlotSubscription = this.plotService.onAddPlot.subscribe(plotData => {
            this.dataFrame = plotData.dataFrame;
            this.plotType = plotData.type;
        });
    }

    public ngOnDestroy(): void {
        this.onAddPlotSubscription.unsubscribe();
    }
}
