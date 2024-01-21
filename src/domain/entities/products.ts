import {Title} from "@domain/entities/title";
import {Description} from "@domain/entities/description";
import {Price} from "@domain/entities/price";
import {ProductType} from "@domain/entities/types/product";

export class Products {

    private constructor(readonly title: Title,
                readonly description: Description,
                readonly price: Price,
                readonly category: string,
                readonly ownerId: string) {
    }

    static async create(product: ProductType) {
        return new Products(new Title(product.title), new Description(product.description),
            new Price(product.price), product.category, product.ownerId);
    }

}