import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
declare var Plotly: any;

@Component({
    selector: "plot",
    templateUrl: "./plot.component.html",
    styleUrls: ["./plot.component.scss"]
})
export class PlotComponent implements OnInit, OnChanges {
    @Input() public data: any;

    @ViewChild("graph", { static: true })
    public graphElement: ElementRef<HTMLElement>;

    public ngOnInit(): void {
        this.updatePlot();
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.data) {
            this.updatePlot();
        }
    }

    private updatePlot() {
        Plotly.newPlot(this.graphElement.nativeElement, this.data);
    }
}