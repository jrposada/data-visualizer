import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { DataMatrix, DataRow } from "../../../core";
import * as _ from "lodash";

interface FormData {
    fromRow: number,
    toRow: number,
    fromColumn: number,
    toColumn: number
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "excel-data-selector-dialog",
    templateUrl: "./excel-data-selector-dialog.component.html",
    styleUrls: ["./excel-data-selector-dialog.component.scss"]
})
export class ExcelDataSelectorDialogComponent implements OnDestroy {
    public readonly rows: DataMatrix;
    public readonly keys: string[];
    
    public formData: FormData;
    public form: FormGroup;
    public readonly fromRowControl: FormControl = new FormControl();
    public readonly toRowControl: FormControl = new FormControl();
    public readonly fromColumnControl: FormControl = new FormControl();
    public readonly toColumnControl: FormControl = new FormControl();

    private selectedData: DataMatrix;
    private formChangeSubscription: Subscription;

    constructor(
        @Inject(MAT_DIALOG_DATA) data: DataMatrix,
        private matDialogRef: MatDialogRef<ExcelDataSelectorDialogComponent>,
        fb: FormBuilder
    ) {
        // Init variables
        this.rows = data;
        this.keys = (this.rows && this.rows.length !== 0) ?
            Object.keys(this.rows[0]) :
            [];

        // Create form
        this.formData = {
            fromRow: 1,
            toRow: this.rows.length - 1,
            fromColumn: 1,
            toColumn: this.keys.length - 1
        }

        this.fromRowControl.setValue(this.formData.fromRow, { emitEvent: false });
        this.toRowControl.setValue(this.formData.toRow, { emitEvent: false });
        this.fromColumnControl.setValue(this.formData.fromColumn, { emitEvent: false });
        this.toColumnControl.setValue(this.formData.toColumn, { emitEvent: false });

        this.fromRowControl.setValidators([Validators.required, Validators.min(this.formData.fromRow), Validators.max(this.formData.toRow)]);
        this.toRowControl.setValidators([Validators.required, Validators.min(this.formData.fromRow), Validators.max(this.formData.toRow)]);
        this.fromColumnControl.setValidators([Validators.required, Validators.min(this.formData.fromColumn), Validators.max(this.formData.toColumn)]);
        this.toColumnControl.setValidators([Validators.required, Validators.min(this.formData.fromColumn), Validators.max(this.formData.toColumn)]);

        this.form = fb.group({
            fromRow: this.fromRowControl,
            toRow: this.toRowControl,
            fromColumn: this.fromColumnControl,
            toColumn: this.toColumnControl
        });

        this.formChangeSubscription = this.form.valueChanges.subscribe((value: FormData) => this.onFormChange(value))

        // Init selection
        this.selectAll();
    }

    public ngOnDestroy() {
        this.formChangeSubscription.unsubscribe();
    }

    public import(): void {
        this.matDialogRef.close(this.selectedData);
    }

    public cancel(): void {
        this.matDialogRef.close();
    }

    public selectAll(): void {
        this.selectedData = this.rows;
    }

    public isSelected(rowIndex: number, columnIndex: number): boolean {
        return this.formData.fromRow <= rowIndex && rowIndex <= this.formData.toRow &&
               this.formData.fromColumn <= columnIndex && columnIndex <= this.formData.toColumn
    }

    private onFormChange(value: FormData): void {
        this.formData = value;
        this.updateSelectedData();
    }

    private updateSelectedData(): void {
        this.selectedData = [];
        this.rows
            .slice(this.formData.fromRow, this.formData.toRow)
            .forEach((row: DataRow) => {
                const selectedRow: DataRow = {}
                Object.keys(row)
                    .slice(this.formData.fromColumn, this.formData.toColumn)
                    .forEach(key => selectedRow[key] = row[key])
                
                this.selectedData.push(selectedRow);
            });
    }
}
