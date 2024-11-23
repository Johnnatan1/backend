import prismaClient from "../../prisma/prisma";

interface ItemRequest {
  order_id: string;
  product_id: string;
  amount: number;
}

class AddItemService {
  async execute({ order_id, product_id, amount }: ItemRequest) {

    const order = await prismaClient.item.create({
      data: {
        order_id,
        product_id,
        amount,
      }
    })

    return order;

  }
}

export { AddItemService };