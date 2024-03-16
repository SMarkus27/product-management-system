import {Title} from "@domain/entities/title";
import {Description} from "@domain/entities/description";
import {CategoryType} from "@domain/entities/types/category";

export class Category {
    private constructor(readonly title: Title,
                        readonly description: Description,
                        readonly owner_id: string,
) {
    }

    static async create(category: CategoryType) {
        const newCategory = new Category(new Title(category.title), new Description(category.description),
            category.owner_id);

        return {
            title: newCategory.title.getValue(),
            description: newCategory.description.getValue(),
            owner_id: newCategory.owner_id,
        }
    }

}