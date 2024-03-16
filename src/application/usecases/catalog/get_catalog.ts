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

        const ownerIds = []

        getAllProducts
            .map(owner => owner.owner_id)
            .map(id => {
                if (!ownerIds.includes(id)) {
                    ownerIds.push(id)
                }
            })


        const catalog = ownerIds.map(owner => {
            return {
                owner: owner,
                catalog: getAllCategories
                    .filter(category => category.owner_id === owner)
                    .map(category => {
                        return {
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
                    })
            }
        })

        return response.status(200).json({
            success: true,
            data: catalog
        })
    }
}