import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "plot-button",
    templateUrl: "./plot-button.component.html",
    styleUrls: ["./plot-button.component.scss"]
})
export class PlotButtonComponent {
    @Input() public src: string = "";
    @Input() public label: string = "";
}