import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSliderModule } from "@angular/material/slider";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";

import { Mesh3dPlotComponent } from "./mesh-3d-plot/mesh-3d-plot.component";
import { Scatter3dPlotComponent } from "./scatter-3d-plot/scatter-3d-plot.component";
import { SurfacePlotComponent } from "./surface-plot/surface-plot.component";
import { EditPlotDialogComponent } from "./edit-plot-dialog/edit-plot-dialog.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PlotComponent } from "./plot.component";

@NgModule({
    declarations: [
        PlotComponent,
        Mesh3dPlotComponent,
        Scatter3dPlotComponent,
        SurfacePlotComponent,
        EditPlotDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        CommonModule,
        MatSliderModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule
    ],
    exports: [
        Mesh3dPlotComponent,
        Scatter3dPlotComponent,
        SurfacePlotComponent
    ]
})
export class PlotModule { }
