import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

export enum EPlotType {
    Scatter3d = "scatter3d",
    Mesh3d = "mesh3d"
}

@Injectable()
export class PlotService {
    private readonly _onPlotAdded: Subject<EPlotType> = new Subject<EPlotType>();
    public get onPlotAdded(): Observable<EPlotType> { return this._onPlotAdded; }
    
    public addPlot(plotType: EPlotType) {
        this._onPlotAdded.next(plotType);
    }
}