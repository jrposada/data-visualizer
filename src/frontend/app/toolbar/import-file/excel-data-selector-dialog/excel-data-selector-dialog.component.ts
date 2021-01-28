import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Data } from "../../../core";

@Component({
    selector: "import-excel",
    templateUrl: "./excel-data-selector-dialog.component.html",
    styleUrls: ["./excel-data-selector-dialog.component.scss"]
})
export class ExcelDataSelectorDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: Data,
        private matDialogRef: MatDialogRef<ExcelDataSelectorDialogComponent>,
    ) {
        console.log(this.data);
    }

    public select(): void {
        this.matDialogRef.close(this.data);
    }

    public cancel(): void {
        this.matDialogRef.close();
    }
}
