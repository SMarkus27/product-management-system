import {ProductRepository} from "@root/src/infra/repository/product";
import {CategoryRepository} from "@root/src/infra/repository/category";
import {Response} from "express";

export class GetCatalog {

    constructor(readonly productRepository: ProductRepository,
                readonly categoryRepository: CategoryRepository) {
    }

    async execute(response: Response): Promise<Response> {
        const getAllProducts = await this.productRepository.getAll()
        const getAllCategories = await this.categoryRepository.getAll();

        const ownerIds = getAllProducts.map(item => item.owner_id);

        const catalog = getAllCategories.map(category => {
            return {
                owner: ownerIds[0],
                catalog: {
                    category_title: category.title,
                    category_description: category.description,
                    items: getAllProducts
                        .filter(product => product.category === category.title)
                        .map(product => {
                            return {
                                title: product.title,
                                description: product.description,
                                price: product.price
                            }
                    })
                }
            }
        })

        return response.status(200).json({
            success: true,
            data: catalog
        })
    }
}