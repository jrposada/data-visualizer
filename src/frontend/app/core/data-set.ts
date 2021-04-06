import { DataFrame } from "./data-frame";
import { v4 as uuidv4 } from "uuid";

export class DataSet {
    public readonly id: string;

    constructor(
        public readonly name: string,
        public readonly dataFrame: DataFrame
    ) {
        this.id = uuidv4();
    }
}
