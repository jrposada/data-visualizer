import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Subject, Subscription } from "rxjs";
import { DataFrame } from "../../core/data-frame";
import { DataService } from "../data/data.service";

export enum EPlotType {
    Scatter3d = "scatter3d",
    Mesh3d = "mesh3d",
    Surface = "surface"
}

@Injectable()
export class PlotService implements OnDestroy {
    // TODO: use plotlyjs types.
    private readonly _onChange: Subject<any> = new Subject<any>();
    public get onChange(): Observable<EPlotType> { return this._onChange; }

    private readonly onDataChangeSubscription: Subscription;
    private dataFrame: DataFrame = new DataFrame();
    private plotType: EPlotType = EPlotType.Mesh3d;

    constructor(private dataService: DataService) {
        this.onDataChangeSubscription = this.dataService.onDataChange.subscribe((dataFrame) => this.onDataChange(dataFrame));
    }

    public ngOnDestroy(): void {
        this.onDataChangeSubscription.unsubscribe();
    }

    public addPlot(plotType: EPlotType): void {
        this.plotType = plotType;
        this.refreshData();
    }

    private onDataChange(dataFrame: DataFrame): void {
        this.dataFrame = dataFrame;
        this.refreshData();
    }

    private refreshData(): void {
        let data: any;

        switch (this.plotType) {
            case EPlotType.Mesh3d:
                data=[{
                    opacity:0.8,
                    color:"rgb(300,100,200)",
                    type: this.plotType,
                    x: this.dataFrame.x,
                    y: this.dataFrame.y,
                    z: this.dataFrame.z
                }];
                break;
            case EPlotType.Scatter3d:
                data=[{
                    opacity:0.8,
                    color:"rgb(300,100,200)",
                    mode: "markers",
                    type: this.plotType,
                    x: this.dataFrame.x,
                    y: this.dataFrame.y,
                    z: this.dataFrame.z
                }];
                break;
            case EPlotType.Surface:
                data = [{
                    showscale: false,
                    colorscale: "Earth",
                    x: this.dataFrame.columns,
                    y: this.dataFrame.rows,
                    z: this.dataFrame.array,
                    type: 'surface'
                }];
            break;
        }
        
        this._onChange.next(data);
    }
}