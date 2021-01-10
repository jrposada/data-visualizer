import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface EditPlotData {
    title: string;
    xAxisName: string;
    yAxisName: string;
    zAxisName: string;
}

@Component({
    selector: "edit-plot-dialog",
    templateUrl: "./edit-plot-dialog.component.html",
    styleUrls: ["./edit-plot-dialog.component.scss"]
})
export class EditPlotDialogComponent {
    constructor(
        public matDialogRef: MatDialogRef<EditPlotDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EditPlotData
       ) { }
}
