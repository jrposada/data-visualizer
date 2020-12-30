import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { PlotModule } from "../plot/plot.module";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "./app.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { ImportFileComponent } from "./toolbar/import-file/import-file.component";
import { FileImporterService } from "./services/file-importer/file-importer.service";
import { XlsxFileImporterService } from "./services/file-importer/xlsx-file-importer.service.ts/xlsx-file-importer.service";
import { DataService } from "./services/data/data.service";

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        ImportFileComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PlotModule
    ],
    providers: [
        FileImporterService,
        XlsxFileImporterService,
        DataService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
