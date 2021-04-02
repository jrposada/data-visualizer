import { ComponentType } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

export enum EDialogType {
    big,
    adaptative
}

@Injectable()
export class DialogService {
    constructor(private matDialog: MatDialog) { }

    public open(component: ComponentType<unknown>, type: EDialogType, data: any) {
        const dialogConfig = this.getDialogConfig(type);

        dialogConfig.data = data;

        return this.matDialog.open(component, dialogConfig);
    }

    private getDialogConfig(type: EDialogType): MatDialogConfig {
        const dialogConfig = new MatDialogConfig();

        switch (type) {
            case EDialogType.big:
                dialogConfig.width = "90%";
                dialogConfig.height = "90%";
                break;
            default:
                break;
        }

        return dialogConfig;
    }
}
