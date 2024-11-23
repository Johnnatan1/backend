import { Request, Response } from 'express'

import { ListCategoryService } from '../../services/category/ListCategoryService'

class ListCategoryController {
  async handle(req: Request, res: Response) {
    
    const categoryList = new ListCategoryService();

    const listCategory = await categoryList.execute();

    return res.json(listCategory);
  }
}

export { ListCategoryController };

