import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { DataFrame } from "src/frontend/app/core/data-frame";

import * as XLSX from "xlsx";

@Injectable()
export class XlsxFileImporterService {
    public import(file: File): Observable<DataFrame> {
        const subject = new Subject<DataFrame>();

        const reader = new FileReader();

        reader.onload = (ev: ProgressEvent<FileReader>) => {
            const data = ev.target?.result;
            const workbook = XLSX.read(data, {
                type: "binary"
            });

            const rows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
            subject.next(new DataFrame(rows as {}[]));
        };

        reader.onerror = (ev: ProgressEvent<FileReader>) => {
            subject.error(ev);
        };

        reader.readAsBinaryString(file);

        return subject;
    }
}
