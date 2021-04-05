import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Subject, Subscription } from "rxjs";
import { DataFrame } from "../../core/data-frame";
import { DataSet } from "../../core/data-set";
import { DataService } from "../data/data.service";

export enum EPlotType {
    Scatter3d = "scatter3d",
    Mesh3d = "mesh3d",
    Surface = "surface"
}

export interface PlotData {
    type: EPlotType;
    dataFrame: DataFrame;
}

@Injectable()
export class PlotService implements OnDestroy {
    // TODO: use plotlyjs types.
    public get onAddPlot(): Observable<PlotData> { return this._onAddPlot; }

    private readonly _onAddPlot: Subject<PlotData> = new Subject<PlotData>();
    private readonly onDataChangeSubscription: Subscription;

    private plotType: EPlotType | undefined = undefined;

    constructor(private dataService: DataService) {
        this.onDataChangeSubscription = this.dataService.onDataChange.subscribe({
            next: this.onDataChange
        });
    }

    public addPlot(plotType: EPlotType, dataSetId: string): void {
        this.plotType = plotType;
        this._onAddPlot.next({
            type: plotType,
            dataFrame: this.dataService.data.find(dataSet => dataSet.id === dataSetId)?.dataFrame || new DataFrame()
        });
    }

    public ngOnDestroy(): void {
        this.onDataChangeSubscription.unsubscribe();
    }

    // TODO: Instead of this we probably want a refresh button somewhere else.
    private onDataChange(dataSets: DataSet[]) {
        if (this.plotType !== undefined)  {
            this.addPlot(this.plotType, dataSets[dataSets.length - 1].id);
        }
    }
}
