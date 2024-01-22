export class Description {
    private readonly _description: string;
    constructor(description: string) {
        if (description.split(" ").length < 2 ) {
            throw new Error("Invalid Description");
        }
        this._description = description
    }

    getValue(): string {
        return this._description;
    }
}