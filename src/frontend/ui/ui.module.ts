import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { DialogService } from "./dialogs/dialog.service";
import { InputDialogComponent } from "./dialogs/input-dialog/input-dialog.component";

@NgModule({
    declarations: [
        InputDialogComponent
    ],
    entryComponents: [
        InputDialogComponent
    ],
    providers: [
        DialogService
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ]
})
export class UiModule { }
