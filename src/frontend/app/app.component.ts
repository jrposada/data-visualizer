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
    public title = "Electron app with Angular";

    public data: any;

    private onDataChangeSubscription: Subscription;
    private plotType: EPlotType = EPlotType.Mesh3d;
    private dataFrame: DataFrame = new DataFrame();

    constructor(
        private dataService: DataService,
        private plotService: PlotService
    ) {
        this.dataService.onDataChange.subscribe((dataFrame) => this.onDataChange(dataFrame))
        this.plotService.onPlotAdded.subscribe((plotType) => this.onPlotAdded(plotType))
    }

    public ngOnDestroy() {
        this.onDataChangeSubscription.unsubscribe();
    }

    private onDataChange(dataFrame: DataFrame) {
        this.dataFrame = dataFrame;
        this.refreshPlot();
    }

    private onPlotAdded(plotType: EPlotType) {
        this.plotType = plotType;
        this.refreshPlot();
    }

    private refreshPlot(): void {
        this.data=[{
            opacity:0.8,
            color:'rgb(300,100,200)',
            type: this.plotType,
            x: this.dataFrame.x,
            y: this.dataFrame.y,
            z: this.dataFrame.z
        }];
    }
}
