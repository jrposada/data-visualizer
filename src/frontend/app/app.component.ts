import { Component } from "@angular/core";
import { PlotService } from "./services/plot/plot.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    public data: any;

    constructor(public plotService: PlotService) {
        this.plotService.onChange.subscribe(data => this.data = data);
    }
}
