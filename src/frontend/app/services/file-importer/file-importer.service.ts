import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { DataFrame } from "../../core";
import { XlsxFileImporterService } from "./xlsx-file-importer.service.ts/xlsx-file-importer.service";

export enum EFileType {
    Xlsx = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
}

@Injectable()
export class FileImporterService {
    constructor(private xlsxFileImporter: XlsxFileImporterService) { }

    public importFiles(files: FileList): Observable<DataFrame> {
        const file = files.item(0);

        let importObservable: Observable<DataFrame> | undefined;
        switch (file?.type) {
            case EFileType.Xlsx:
                importObservable = this.xlsxFileImporter.import(file);
                break;
            default:
                console.log(`No file importer for type: ${files.item(0)?.type}`);
        }

        return importObservable || of(new DataFrame());
    }
}
