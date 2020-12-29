import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    public title = "Electron app with Angular";

    public data: any;

    constructor() {
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
        this.data=[{
            opacity:0.8,
            color:'rgb(300,100,200)',
            type: 'mesh3d',
            x: a,
            y: b,
            z: c,
        }];
    }
}
