import { ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { DataFrame } from "src/frontend/app/core/data-frame";
declare var Plotly: any;

export abstract class PlotComponent implements OnInit, OnChanges, OnDestroy {
    @Input() public dataFrame: DataFrame = new DataFrame();
    @Input() public layout: any;

    @ViewChild("graph", { static: true })
    public graphElement: ElementRef<HTMLElement>;

    public readonly sliderControl: FormControl = new FormControl();
    public sliderMax: number;

    private sliderValueChangesSubscription: Subscription;

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

    private updatePlot() {
        const data = this.calculateData();

        Plotly.newPlot(this.graphElement.nativeElement, data, this.layout);
    }

    private updateSlider() {
        // First row is the variable definitions
        const value = this.dataFrame.isEmpty ? 1 : this.dataFrame.rows.length - 1;
        this.sliderMax = value;
        this.sliderControl.setValue(value);
    }
    
    protected abstract calculateData(): any;
}