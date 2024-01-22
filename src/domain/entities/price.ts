export class Price {
    private readonly _price: number;

    constructor(price: number) {
        if (price < 0) {
            throw new Error("Price must be more than zero");
        }
        this._price = price;
    }

    getValue(): number {
        return this._price;
    }
}