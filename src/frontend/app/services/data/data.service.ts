import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { DataFrame } from "../../core";

@Injectable()
export class DataService {
    private readonly _onDataChange: Subject<DataFrame> = new Subject<DataFrame>();
    public get onDataChange(): Observable<DataFrame> { return this._onDataChange; }

    private _data: DataFrame;
    public get data(): DataFrame { return this._data; }

    public setData(dataFrame: DataFrame) {
        this._data = dataFrame;
        this._onDataChange.next(dataFrame);
    }
}
