import { GoodsModel } from "./GoodsModel";

export class GoodsController {
  private model: GoodsModel;
  private _hasNextPage: boolean;

  constructor() {
    this.model = new GoodsModel;
    this._hasNextPage = false;
  }

  public get hasNextPage() {
    return this._hasNextPage;
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
    this._hasNextPage = ids.length > limit;

    const items = await this.model.getItems(
      ids
    );

    return [...(new Set(ids))]
      .map(id =>
        items.find(item =>
          item.id === id))
      .filter(item => item !== undefined)
      .slice(0, limit) as typeof items;
  }
}