export class Title {
    private readonly _title: string;

    constructor(title: string) {
        if (title.length < 5) {
            throw new Error("Invalid Title");
        }
        this._title = title;
    }

    getValue(): string {
        return this._title;
    }
}