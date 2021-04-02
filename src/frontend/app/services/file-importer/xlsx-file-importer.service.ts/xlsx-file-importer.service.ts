import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Observable, Subject } from "rxjs";

import * as XLSX from "xlsx";
import { DataMatrix, DataFrame } from "../../../core";
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

        const rows: DataMatrix = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        this.openSelectDataDialog(rows).subscribe((selectedData) => {
            try {
                console.log("Creating dataframe");
                subject.next(new DataFrame(selectedData as DataMatrix));
            } catch (err: any) {
                subject.error(err);
            }
        });
    }

    private onFileError(ev: ProgressEvent<FileReader>, subject: Subject<DataFrame>): void {
        subject.error(ev);
    }

    private openSelectDataDialog(rows: DataMatrix): Observable<DataMatrix> {
        const subject = new Subject<DataMatrix>();
        const dialogConfig = new MatDialogConfig();

        dialogConfig.width = "90%";
        dialogConfig.height = "90%";

        dialogConfig.data = rows;

        const dialogRef = this.matDialog.open(ExcelDataSelectorDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((selectedRows: DataMatrix) => {
            subject.next(selectedRows);
        });

        return subject;
    }
}
