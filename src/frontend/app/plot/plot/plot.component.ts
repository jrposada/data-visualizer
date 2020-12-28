import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
declare var Plotly: any;

@Component({
    selector: "plot",
    templateUrl: "./plot.component.html",
    styleUrls: ["./plot.component.scss"]
})
export class PlotComponent implements OnInit {
    @ViewChild("plot", { static: true })
    public plotElement: ElementRef<HTMLElement>;

    public ngOnInit(): void {
        // Generating random data..
        let a = [];
        let b = [];
        let c = [];

        for (let i = 0; i < 50; i++) {
            var a_ = Math.random(); 
            a.push(a_);
            
            var b_ = Math.random(); 
            b.push(b_);
            
            var c_ = Math.random(); 
            c.push(c_);
        }

        // Plotting the mesh
        let data=[{
            opacity:0.8,
            color:'rgb(300,100,200)',
            type: 'mesh3d',
            x: a,
            y: b,
            z: c,
        }];
        Plotly.newPlot(this.plotElement.nativeElement, data);
    }
}