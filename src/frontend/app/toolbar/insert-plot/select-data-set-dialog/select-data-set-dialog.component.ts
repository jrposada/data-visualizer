import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { DataService } from "src/frontend/app/services/data/data.service";


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "select-data-set-dialog",
    templateUrl: "./select-data-set-dialog.component.html"
})
export class SelectDataSetDialogComponent {
    public selectedDataSetId: string[] | undefined = undefined;

    constructor(
        public dataService: DataService,
        private matDialogRef: MatDialogRef<SelectDataSetDialogComponent>
    ) { }

    public select(): void {
        this.matDialogRef.close(this.selectedDataSetId ? this.selectedDataSetId[0] : undefined);
    }

    public cancel(): void {
        this.matDialogRef.close(undefined);
    }
}
