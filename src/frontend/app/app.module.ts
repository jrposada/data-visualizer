import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { PlotModule } from "../plot/plot.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { ImportFileComponent } from "./toolbar/import-file/import-file.component";
import { FileImporterService } from "./services/file-importer/file-importer.service";
import { XlsxFileImporterService } from "./services/file-importer/xlsx-file-importer.service.ts/xlsx-file-importer.service";
import { DataService } from "./services/data/data.service";
import { InsertPlotComponent } from "./toolbar/insert-plot/insert-plot.component";
import { PlotButtonComponent } from "./toolbar/insert-plot/plot-button/plot-button.component";
import { PlotService } from "./services/plot/plot.service";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule} from "@angular/material/table";
import { ExcelDataSelectorDialogComponent } from "./toolbar/import-file/excel-data-selector-dialog/excel-data-selector-dialog.component";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UiModule } from "../ui/ui.module";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { SelectDataSetDialogComponent } from "./toolbar/insert-plot/select-data-set-dialog/select-data-set-dialog.component";
import { MatListModule } from "@angular/material/list";

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        ImportFileComponent,
        InsertPlotComponent,
        PlotButtonComponent,
        ExcelDataSelectorDialogComponent,
        SelectDataSetDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        UiModule,
        PlotModule,
        MatDialogModule,
        MatButtonModule,
        MatTableModule,
        MatListModule,
        MatInputModule,
        MatFormFieldModule
    ],
    providers: [
        FileImporterService,
        XlsxFileImporterService,
        DataService,
        PlotService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
