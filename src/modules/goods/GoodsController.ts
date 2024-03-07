import { GoodsModel } from "./GoodsModel";

export interface Meta {
  currentPage: number;
  previousPage: number | undefined;
  nextPage: number | undefined;
  lastPage?: number;
}

export class GoodsController {
  private model: GoodsModel;

  constructor() {
    this.model = new GoodsModel;
  }

  private async getNumberAllItems(): Promise<number> {
    return (await this.model.getAllIds()).length;
  }

  public async getNumAllPages(limit: number) {
    return Math.ceil((await this.getNumberAllItems()) / limit);
  }

  public async getGoods(limit: number, page: number) {
    const offset = (page - 1) * limit;

    const ids = await this.model.getIds(limit + 1, offset);

    const items = await this.model.getItems(
      ids
    );

    const lastPage = await this.getNumAllPages(limit);

    const goods = [...(new Set(ids))]
      .map(id =>
        items.find(item =>
          item.id === id))
      .filter(item => item !== undefined)
      .slice(0, limit) as typeof items;

    const previousPage = page > 1 ? page - 1 : undefined;
    const nextPage = page < lastPage ? page + 1 : undefined;

    const meta: Meta = {
      currentPage: page,
      previousPage,
      nextPage,
      lastPage,
    };

    return { goods, meta };
  }
}
