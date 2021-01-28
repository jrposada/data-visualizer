export type Data = {[key: string]: string}[];


export class DataFrame {
    public readonly data: Data | undefined;

    public get isEmpty(): boolean { return this.data === undefined; }

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

        return this._array;
    }

    public get shape(): number[] {
        return [this.rows.length, this.columns.length - 1];
    }

    private _columns: string[];
    public get columns(): string[] {
        if (!this._columns) {
            this.getColumns();
        }

        return this._columns;
    }

    private _rows: string[];
    public get rows(): string[] {
        if (!this._rows) {
            this.getRows();
        }

        return this._rows;
    }

    constructor(data?: Data) {
        this.validateData(data);
        this.data = data;
    }

    public min(axis: "row" | "column"): number[] {
        const min: number[] = [];
        switch (axis) {
            case "row":
                this.data?.forEach(row => {
                    const rowValues: number[] = [];
                    Object.keys(row).slice(1).forEach(value => rowValues.push(Number.parseFloat(value)));
                    min.push(Math.min(...rowValues));
                });
                break;
            case "column":
                this.columns.slice(1).forEach(column => {
                    const columnValues: number[] = [];
                    this.data?.forEach(row => columnValues.push(Number.parseFloat(row[column])));
                    min.push(Math.min(...columnValues));
                });
                break;
        }
        return min;
    }

    public max(axis: "row" | "column"): number[] {
        const max: number[] = [];
        switch (axis) {
            case "row":
                this.data?.forEach(row => {
                    const rowValues: number[] = [];
                    Object.keys(row).slice(1).forEach(value => rowValues.push(Number.parseFloat(value)));
                    max.push(Math.max(...rowValues));
                });
                break;
            case "column":
                this.columns.slice(1).forEach(column => {
                    const columnValues: number[] = [];
                    this.data?.forEach(row => columnValues.push(Number.parseFloat(row[column])));
                    max.push(Math.max(...columnValues));
                });
                break;
        }
        return max;
    }

    private validateData(data?: Data): void {
        if (data) {
            // Validate matrix shape
            const numColumns = Object.keys(data[0]).length;
            data.slice(1).forEach(row => {
                if (Object.keys(row).length !== numColumns) {
                    throw new Error("Invalid file: Data matrix is incomplete.");
                }
            });

            // Validate matrix content
            data.slice(1).forEach(row => {
                Object.keys(row).slice(1).forEach(key => {
                    if (isNaN(Number(row[key]))) {
                        throw new Error(`Invalid file: Data matrix inner values have to be numbers.[${row[Object.keys(row)[0]]}, ${key}] = ${row[key]}`);
                    }
                });
            });
        }
    }

    private get3dPoints(): void {
        this._x = [], this._y = [], this._z = [];

        if (this.data) {
            this.data.forEach(row => {
                Object.keys(row).slice(1).forEach(x => {
                    this._x.push(x);
                    this._y.push(row[this.columns[0]]);
                    this._z.push(row[x]);
                });
            });
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
            });
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
