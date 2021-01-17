import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

export enum EPlotType {
    Scatter3d = "scatter3d",
    Mesh3d = "mesh3d",
    Surface = "surface"
}

@Injectable()
export class PlotService {
    // TODO: use plotlyjs types.
    private readonly _onAddPlot: Subject<EPlotType> = new Subject<EPlotType>();
    public get onAddPlot(): Observable<EPlotType> { return this._onAddPlot; }

    public addPlot(plotType: EPlotType): void {
        this._onAddPlot.next(plotType);
    }
}
