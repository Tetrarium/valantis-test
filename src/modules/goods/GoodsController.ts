import { Controller } from "@/types/constroller";
import { GoodsModel } from "./GoodsModel";

export class GoodsController implements Controller {
  model: GoodsModel;

  constructor() {
    this.model = new GoodsModel;
  }

  public async getGoods() {
    await this.model.fetchIds();
    await this.model.fetchItems();
    return this.model.getItems();
  }
}