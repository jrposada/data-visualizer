import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { DataFrame } from "./core/data-frame";
import { DataService } from "./services/data/data.service";
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

    private onDataChangeSubscription: Subscription;
    private plotType: EPlotType;

    constructor(
        private plotService: PlotService,
        private dataService: DataService
    ) {
        this.plotService.onAddPlot.subscribe(plotType => this.plotType = plotType);
        this.onDataChangeSubscription = this.dataService.onDataChange.subscribe(dataFrame => this.dataFrame = dataFrame);
    }

    public ngOnDestroy(): void {
        this.onDataChangeSubscription.unsubscribe();
    }
}
