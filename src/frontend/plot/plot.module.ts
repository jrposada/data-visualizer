import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSliderModule } from "@angular/material/slider";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";

import { Mesh3dPlotComponent } from "./mesh-3d-plot/mesh-3d-plot.component";
import { Scatter3dPlotComponent } from "./scatter-3d-plot/scatter-3d-plot.component";
import { SurfacePlotComponent } from "./surface-plot/surface-plot.component";
import { EditPlotDialogComponent } from "./edit-plot-dialog/edit-plot-dialog.component";

@NgModule({
    declarations: [
        Mesh3dPlotComponent,
        Scatter3dPlotComponent,
        SurfacePlotComponent,
        EditPlotDialogComponent
    ],
    entryComponents: [
        EditPlotDialogComponent
    ],
    imports: [
        ReactiveFormsModule,
        MatSliderModule,
        MatButtonModule,
        MatDialogModule,
        CommonModule
    ],
    exports: [
        Mesh3dPlotComponent,
        Scatter3dPlotComponent,
        SurfacePlotComponent
    ]
})
export class PlotModule { }
