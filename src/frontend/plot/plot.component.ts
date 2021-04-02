import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialogConfig } from "@angular/material/dialog";
import { MatDialog } from "@angular/material/dialog";
import { interval, Subscription } from "rxjs";
import { DataFrame } from "src/frontend/app/core";
import { EditPlotData, EditPlotDialogComponent } from "./edit-plot-dialog/edit-plot-dialog.component";

declare var Plotly: any;

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "plot",
    templateUrl: "./plot.component.html",
    styleUrls: ["./plot.component.scss"]
})
export class PlotComponent implements OnInit, OnChanges, OnDestroy {
    @Input() public dataFrame: DataFrame = new DataFrame();

    @ViewChild("graph", { static: true })
    public graphElement: ElementRef<HTMLElement>;

    public readonly sliderControl: FormControl = new FormControl();
    public sliderMin = 1;
    public sliderMax: number;
    public isPlaying = false;

    private sliderValueChangesSubscription: Subscription;
    private automaticRangeTickSubscription: Subscription;

    private title = "Plot";
    private xAxisName = "Columns";
    private yAxisName = "Rows";
    private zAxisName = "Values";

    constructor(private matDialog: MatDialog) { }

    public ngOnInit(): void {
        this.sliderValueChangesSubscription = this.sliderControl.valueChanges.subscribe(() => this.updatePlot());
        this.updatePlot();
        this.updateSlider();
    }

    public ngOnDestroy() {
        this.sliderValueChangesSubscription.unsubscribe();
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.dataFrame) {
            this.updatePlot();
            this.updateSlider();
        }
    }

    public toggleRangeCycle(): void {
        if (this.isPlaying) {
            this.isPlaying = false;
            this.automaticRangeTickSubscription.unsubscribe();
        } else {
            this.isPlaying = true;
            this.automaticRangeTickSubscription = interval(1000).subscribe(() => {
                let value = this.sliderControl.value + 1;
                if (value > this.sliderMax) {
                    value = this.sliderMin;
                }
                this.sliderControl.setValue(value);
            });
        }
    }

    public edit(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.width = "250px";

        dialogConfig.data = {
            title: this.title,
            xAxisName: this.xAxisName,
            yAxisName: this.yAxisName,
            zAxisName: this.zAxisName
        } as EditPlotData;

        const dialogRef = this.matDialog.open(EditPlotDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.title = result.title;
                this.xAxisName = result.xAxisName;
                this.yAxisName = result.yAxisName;
                this.zAxisName = result.zAxisName;

                const layout = this.calculateLayout();

                Plotly.relayout(this.graphElement.nativeElement, layout);
            }
        });
    }

    private updatePlot() {
        const data = this.calculateData();
        const layout = this.calculateLayout();
        const config = {
            responsive: true
        };

        Plotly.react(this.graphElement.nativeElement, data, layout, config);
    }

    private updateSlider() {
        if (this.dataFrame.isEmpty) {
            this.sliderControl.disable();
        } else {
            this.sliderControl.enable();
        }

        const value = this.dataFrame.isEmpty ? 1 : this.dataFrame.rows.length;
        this.sliderMax = value;
        this.sliderControl.setValue(value);
    }

    protected calculateData(): any {}

    private calculateLayout(): any {
        // Use a z range a 10% bigger than current data
        let zMin = Math.min(...this.dataFrame.min("row"));
        let zMax = Math.max(...this.dataFrame.max("row"));

        const zLength = zMin - zMax;
        zMin -= zLength * 0.05;
        zMax += zLength * 0.05;

        // Calculate ratio in reference to x_ratio=1
        const yRatio = this.dataFrame.shape[0] / this.dataFrame.shape[1];

        return {
            uirevision: this.dataFrame,
            autosize: true,
            margin: {
                t: 50,
                r: 0,
                b: 10,
                l: 0,
            },
            title: {
                text: this.title
            },
            scene: {
                aspectmode: "manual",
                aspectratio: {
                    x: 1,
                    y: yRatio,
                    z: 1
                },
                xaxis: {
                    title: {
                        text: this.xAxisName
                    },
                    ticks: "outside",
                    nticks: this.dataFrame.shape[1],
                    range: [0, this.dataFrame.shape[1]]
                },
                yaxis: {
                    title: {
                        text: this.yAxisName
                    },
                    ticks: "outside",
                    nticks: this.dataFrame.shape[0],
                    range: [0, this.dataFrame.shape[0]]
                },
                zaxis: {
                    title: {
                        text: this.zAxisName
                    },
                    ticks: "outside",
                    range: [zMin, zMax]
                }
            }
        };
    }
}
