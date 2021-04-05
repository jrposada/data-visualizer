import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface InputDialogOptions {
    title?: string;
    description?: string;
    placeholder?: string;
    submit?: string;
    close?: string;
}

@Component({
    selector: "input-dialog",
    templateUrl: "./input-dialog.component.html"
})
export class InputDialogComponent {
    public readonly inputControl: FormControl = new FormControl(undefined, Validators.required);

    constructor(
        @Inject(MAT_DIALOG_DATA) public readonly data: InputDialogOptions,
        private matDialogRef: MatDialogRef<InputDialogComponent>
    ) { }

    public submit(): void {
        this.matDialogRef.close(this.inputControl.value);
    }

    public close(): void {
        this.matDialogRef.close(undefined);
    }
}
