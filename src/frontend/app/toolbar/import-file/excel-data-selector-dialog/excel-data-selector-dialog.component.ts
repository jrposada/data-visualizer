import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DataMatrix, DataRow } from "../../../core";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "excel-data-selector-dialog",
    templateUrl: "./excel-data-selector-dialog.component.html",
    styleUrls: ["./excel-data-selector-dialog.component.scss"]
})
export class ExcelDataSelectorDialogComponent {
    public readonly rows: DataMatrix;
    public readonly keys: string[];

    private selectedData: DataMatrix;

    constructor(
        @Inject(MAT_DIALOG_DATA) data: DataMatrix,
        private matDialogRef: MatDialogRef<ExcelDataSelectorDialogComponent>,
    ) {
        this.rows = data;
        this.keys = (this.rows && this.rows.length !== 0) ?
            Object.keys(this.rows[0]) :
            [];
    }

    public getItems(row: DataRow): string[] {
        const items: string[] = [];

        Object.values(row).forEach(value => items.push(value));

        return items;
    }

    public import(): void {
        this.matDialogRef.close(this.selectedData);
    }

    public cancel(): void {
        this.matDialogRef.close();
    }
}
