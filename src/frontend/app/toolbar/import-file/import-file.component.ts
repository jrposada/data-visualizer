import { Component } from "@angular/core";
import { DataService } from "../../services/data/data.service";
import { EFileType, FileImporterService } from "../../services/file-importer/file-importer.service";

@Component({
    selector: "import-file",
    templateUrl: "./import-file.component.html",
    styleUrls: ["./import-file.component.scss"]
})
export class ImportFileComponent {
    public supportedFileTypes = EFileType.Xlsx;

    constructor(private fileImporterService: FileImporterService, private dataService: DataService) { }

    public handleFileInput(files: FileList) {
        this.fileImporterService.importFiles(files)
            .subscribe(
                dataFrame => this.dataService.setData(dataFrame),
                err => alert(err)
            );
    }
}
