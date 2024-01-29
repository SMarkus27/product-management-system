import {Title} from "@domain/entities/title";
import {Description} from "@domain/entities/description";
import {Price} from "@domain/entities/price";
import {ProductType} from "@domain/entities/types/product";

export class Products {

    private constructor(readonly title: Title,
                readonly description: Description,
                readonly price: Price,
                readonly category: string,
                readonly owner_id: string,
                readonly product_id: string) {
    }

    static async create(product: ProductType) {
        const newProduct = new Products(new Title(product.title), new Description(product.description),
            new Price(product.price), product.category, product.owner_id, product.product_id);
        return {
            title: newProduct.title.getValue(),
            description: newProduct.description.getValue(),
            price: newProduct.price.getValue(),
            category: newProduct.category,
            owner_id: newProduct.owner_id,
            product_id: newProduct.product_id,

        }
    }

}