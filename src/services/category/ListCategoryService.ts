import prismaClient from "../../prisma/prisma";

class ListCategoryService {
  async execute() {

    const listCategory = await prismaClient.category.findMany({
      select: {
        id: true,
        name: true,
      }
    })

    return listCategory;

  }
}

export { ListCategoryService };