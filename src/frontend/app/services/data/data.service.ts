import { Injectable } from "@angular/core";
import { Observable, PartialObserver, Subject } from "rxjs";
import { DialogService, EDialogType, InputDialogComponent, InputDialogOptions } from "src/frontend/ui";
import { DataSet } from "../../core/data-set";
import { DataFrame } from "../../core";

@Injectable()
export class DataService {
    public get onDataChange(): Observable<DataSet[]> { return this._onDataChange; }
    public get data(): DataSet[] { return this._dataSets; }

    private readonly _onDataChange: Subject<DataSet[]> = new Subject<DataSet[]>();
    private readonly _dataSets: DataSet[] = [];

    constructor(private dialogService: DialogService) { }

    public addData(dataFrame: DataFrame) {
        const options = {
            title: "Add data set to workspace",
            placeholder: "Name",
            submit: "Add",
            close: "Cancel"
        } as InputDialogOptions;

        this.dialogService.open(InputDialogComponent, EDialogType.adaptative, options).afterClosed().subscribe({
            next: (name: string) => this.onDialogClosed(name, dataFrame)
        } as PartialObserver<string>);
    }

    private onDialogClosed(name: string, dataFrame: DataFrame) {
        if (name !== undefined) {
            this._dataSets.push(new DataSet(name, dataFrame));
            this._onDataChange.next(this._dataSets);
        }
    }
}
