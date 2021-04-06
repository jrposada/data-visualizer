import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogService, EDialogType } from "src/frontend/ui";
import { EPlotType, PlotService } from "../../services/plot/plot.service";
import { SelectDataSetDialogComponent } from "./select-data-set-dialog/select-data-set-dialog.component";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "insert-plot",
    templateUrl: "./insert-plot.component.html",
    styleUrls: ["./insert-plot.component.scss"]
})
export class InsertPlotComponent {
    constructor(
        private plotService: PlotService,
        private dialogService: DialogService
    ) { }

    public addScatter3dPlot() {
        this.openSelectDataSetDialog(EPlotType.Scatter3d);
    }

    public addMesh3dPlot() {
        this.openSelectDataSetDialog(EPlotType.Mesh3d);
    }

    public addSurfacePlot() {
        this.openSelectDataSetDialog(EPlotType.Surface);
    }

    private openSelectDataSetDialog(plotType: EPlotType) {
        this.dialogService
            .open(SelectDataSetDialogComponent, EDialogType.adaptative)
            .afterClosed().subscribe({
                next: (dataSetId: string) => this.plotService.addPlot(plotType, dataSetId)
            });
    }
}
