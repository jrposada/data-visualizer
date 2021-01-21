import { Component, Inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
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
    public form: FormGroup;
    public readonly titleControl: FormControl = new FormControl();
    public readonly xAxisNameControl: FormControl = new FormControl();
    public readonly yAxisNameControl: FormControl = new FormControl();
    public readonly zAxisNameControl: FormControl = new FormControl();

    private formData: EditPlotData;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: EditPlotData,
        private matDialogRef: MatDialogRef<EditPlotDialogComponent>,
        fb: FormBuilder
    ) {
        this.form = fb.group({
            title: this.titleControl,
            xAxisName: this.xAxisNameControl,
            yAxisName: this.yAxisNameControl,
            zAxisName: this.zAxisNameControl
        });
    }

    public save(): void {
        this.matDialogRef.close(this.formData);
    }

    public close(): void {
        this.matDialogRef.close(undefined);
    }
}
