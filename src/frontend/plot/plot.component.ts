import { ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { interval, Subscription } from "rxjs";
import { DataFrame } from "src/frontend/app/core/data-frame";
declare var Plotly: any;

export abstract class PlotComponent implements OnInit, OnChanges, OnDestroy {
    @Input() public dataFrame: DataFrame = new DataFrame();

    @ViewChild("graph", { static: true })
    public graphElement: ElementRef<HTMLElement>;

    public readonly sliderControl: FormControl = new FormControl();
    public sliderMin: number = 1;
    public sliderMax: number;
    public isPlaying: boolean = false;

    private sliderValueChangesSubscription: Subscription;
    private automaticRangeTickSubscription: Subscription;

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

    private updatePlot() {
        const data = this.calculateData();
        const layout = this.calculateLayout();
        const config = {
            responsive: true
        };

        Plotly.react(this.graphElement.nativeElement, data, layout, config);
    }

    private updateSlider() {
        // First row is the variable definitions
        const value = this.dataFrame.isEmpty ? 1 : this.dataFrame.rows.length;
        this.sliderMax = value;
        this.sliderControl.setValue(value);
    }
    
    protected abstract calculateData(): any;

    private calculateLayout(): any {
        // Use a z range a 10% bigger than current data
        let zMin = Math.min(...this.dataFrame.min("row"));
        let zMax = Math.max(...this.dataFrame.max("row"));
            
        const zLength = zMin - zMax;
        zMin -= zLength * 0.05
        zMax += zLength * 0.05

        // Calculate ratio in reference to x_ratio=1
        const yRatio = this.dataFrame.shape[0] / this.dataFrame.shape[1]

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
                text: "Awesome plot"
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
                        text: "Columns"
                    },
                    ticks: "outside",
                    nticks: this.dataFrame.shape[1],
                    range: [0, this.dataFrame.shape[1]]
                },
                yaxis: {
                    title: {
                        text: "Rows"
                    },
                    ticks: "outside",
                    nticks: this.dataFrame.shape[0],
                    range: [0, this.dataFrame.shape[0]]
                },
                zaxis: {
                    title: {
                        text: "Values"
                    },
                    ticks: "outside",
                    range: [zMin,zMax]
                }
            }
        };
    }
}