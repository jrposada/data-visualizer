export class DataFrame {
    public readonly data: {[key:string]:string}[] | undefined;

    public get isEmpty(): boolean { return this.data === undefined }

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

    private _array: string[][];
    public get array(): string[][] {
        if (!this._array) {
            this.getArray();
        }

        return this._array
    }

    private _columns: string[];
    public get columns(): string[] {
        if (!this._columns) {
            this.getColumns();
        }

        return this._columns;
    };

    private _rows: string[];
    public get rows(): string[] {
        if (!this._rows) {
            this.getRows();
        }

        return this._rows;
    }

    constructor();
    constructor(data: {[key:string]:string}[]);
    constructor(data?: {[key:string]:string}[]) {
        this.data = data;
    }

    private get3dPoints(): void {
        this._x = [], this._y = [], this._z = [];

        if (this.data) {
            this.data.forEach(row => {
                Object.keys(row).slice(1).forEach(x => {
                    this._x.push(x);
                    this._y.push(row[this.columns[0]]);
                    this._z.push(row[x]);
                })
            })
        }
    }

    private getArray(): void {
        this._array = [];

        if (this.data) {
            this.data.forEach(row => {
                const subArray: string[] = [];

                Object.keys(row).slice(1).forEach(key => {
                    subArray.push(row[key]);
                });

                this._array.push(subArray);
            })
        }
    }

    private getColumns(): void {
        this._columns = [];
        
        if (this.data) {
            Object.keys(this.data[0]).forEach((key) => this._columns.push(key));
        }
    }

    private getRows(): void {
        this._rows = [];

        if (this.data) {
            this.data.forEach(row => {
                this._rows.push(row[this.columns[0]]);
            });
        }
    }
}

// [{"__EMPTY":"Manzanas","Paco":1,"Juan":3,"Pepe":6},
// {"__EMPTY":"Peras","Paco":3,"Juan":7,"Pepe":2},
// {"__EMPTY":"Cebollas","Paco":5,"Juan":0,"Pepe":1},
// {"__EMPTY":"Albaricoque","Paco":4,"Juan":6,"Pepe":1},
// {"__EMPTY":"Limon","Paco":2,"Juan":3,"Pepe":4}]