export class DataFrame {
    public readonly data: {[key:string]:string}[] | undefined;

    private _x: string[];
    public get x(): string[] {
        if (!this._x) {
            this.get3dPoints();
        }
        
        return this._x;
    }

    private _y: string[];
    public get y(): string[] {
        if (!this._y) {
            this.get3dPoints();
        }
        
        return this._y;
    }

    private _z: string[];
    public get z(): string[] {
        if (!this._z) {
            this.get3dPoints();
        }
        
        return this._z;
    }

    private readonly keys: string[];

    constructor();
    constructor(data: {[key:string]:string}[]);
    constructor(data?: {[key:string]:string}[]) {
        this.data = data;

        if (this.data) {
            this.keys = [];
            Object.keys(this.data[0]).forEach((key) => this.keys.push(key));
        }
    }

    private get3dPoints(): void {
        this._x = [], this._y = [], this._z = [];

        if (this.data) {
            this.data.forEach(row => {
                Object.keys(row).slice(1).forEach(x => {
                    this._x.push(x);
                    this._y.push(row[this.keys[0]]);
                    this._z.push(row[x]);
                })
            })
        }
    }
}

// [{"__EMPTY":"Manzanas","Paco":1,"Juan":3,"Pepe":6},
// {"__EMPTY":"Peras","Paco":3,"Juan":7,"Pepe":2},
// {"__EMPTY":"Cebollas","Paco":5,"Juan":0,"Pepe":1},
// {"__EMPTY":"Albaricoque","Paco":4,"Juan":6,"Pepe":1},
// {"__EMPTY":"Limon","Paco":2,"Juan":3,"Pepe":4}]