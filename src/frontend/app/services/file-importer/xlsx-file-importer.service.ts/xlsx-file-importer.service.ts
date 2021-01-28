import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Observable, Subject } from "rxjs";

import * as XLSX from "xlsx";
import { Data, DataFrame } from "../../../core";
import { ExcelDataSelectorDialogComponent } from "../../../toolbar/import-file/excel-data-selector-dialog/excel-data-selector-dialog.component";

@Injectable()
export class XlsxFileImporterService {
    constructor(private matDialog: MatDialog) { }

    public import(file: File): Observable<DataFrame> {
        const subject = new Subject<DataFrame>();

        const reader = new FileReader();

        reader.onload = (ev: ProgressEvent<FileReader>) => this.onFileLoad(ev.target?.result, subject);
        reader.onerror = (ev: ProgressEvent<FileReader>) => this.onFileError(ev, subject);

        reader.readAsBinaryString(file);

        return subject;
    }

    private onFileLoad(data: string | ArrayBuffer | null | undefined, subject: Subject<DataFrame>): void {
        const workbook = XLSX.read(data, {
            type: "binary"
        });

        const rows: Data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        this.openSelectDataDialog(rows).subscribe((selectedData) => {
            try {
                console.log("Creating dataframe");
                subject.next(new DataFrame(selectedData as Data));
            } catch (err: any) {
                subject.error(err);
            }
        });
    }

    private onFileError(ev: ProgressEvent<FileReader>, subject: Subject<DataFrame>): void {
        subject.error(ev);
    }

    private openSelectDataDialog(rows: Data): Observable<Data> {
        const subject = new Subject<Data>();
        const dialogConfig = new MatDialogConfig();

        dialogConfig.width = "500px";

        dialogConfig.data = rows;

        const dialogRef = this.matDialog.open(ExcelDataSelectorDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((selectedRows: Data) => {
            subject.next(selectedRows);
        });

        return subject;
    }
}
