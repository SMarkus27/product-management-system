import {Title} from "@domain/entities/title";
import {Description} from "@domain/entities/description";
import {CategoryType} from "@domain/entities/types/category";

export class Category {
    private constructor(readonly title: Title,
                        readonly description: Description,
                        readonly ownerId: string) {
    }

    static async create(category: CategoryType) {
        return new Category(new Title(category.title), new Description(category.description),category.ownerId);
    }

}