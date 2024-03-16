import {ProductRepository} from "@root/src/infra/repository/product";
import {CategoryRepository} from "@root/src/infra/repository/category";
import {Response} from "express";
import {log} from "testcontainers";

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
                            items: getAllProducts.map(product => {
                                if (product.category === category.title) {
                                    return {
                                        title: product.title,
                                        description: product.description,
                                        price: product.price
                                    }
                                }

                            }).filter(value => value !== undefined)
                    }
                }
            })

        return response.status(200).json({
            success: true,
            data: catalog
        })
    }
}