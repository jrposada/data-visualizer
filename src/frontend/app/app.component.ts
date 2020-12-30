import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { DataFrame } from "./core/data-frame";
import { DataService } from "./services/data/data.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnDestroy {
    public title = "Electron app with Angular";

    public data: any;

    private onDataChangeSubscription: Subscription;

    constructor(private dataService: DataService) {
        this.dataService.onDataChange.subscribe((dataFrame) => this.onDataChange(dataFrame))
    }

    public ngOnDestroy() {
        this.onDataChangeSubscription.unsubscribe();
    }

    private onDataChange(dataFrame: DataFrame) {
        this.data=[{
            opacity:0.8,
            color:'rgb(300,100,200)',
            type: 'mesh3d',
            x: dataFrame.x,
            y: dataFrame.y,
            z: dataFrame.z
        }];
    }
}
