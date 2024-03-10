import { SHOW_LIMIT } from "@/config";

import { GoodsModel } from "./GoodsModel";

export interface Meta {
  currentPage: number;
  previousPage: number | undefined;
  nextPage: number | undefined;
  lastPage?: number;
}

export class GoodsController {
  private model: GoodsModel;
  private _page: number;
  private _limit: number;

  constructor() {
    this.model = new GoodsModel;
    this._page = 1;
    this._limit = SHOW_LIMIT;
  }

  public async setPage(page: number) {
    if (page < 1) {
      this._page = 1;
      return this._page;
    }

    const maxPage = await this.getNumAllPages();
    this._page = page > maxPage ? maxPage : page;
    return this._page;
  }

  public getPage() {
    return this._page;
  }

  private async getNumberAllItems(): Promise<number> {
    return (await this.model.getAllIds()).length;
  }

  public async getNumAllPages() {
    return Math.ceil((await this.getNumberAllItems()) / this._limit);
  }

  public async getGoods() {
    const offset = getOffset(this._limit, this._page);

    const ids = await this.model.getIds(this._limit + 1, offset);

    const items = await this.model.getItems(
      ids
    );

    const lastPage = await this.getNumAllPages();

    const goods = [...(new Set(ids))]
      .map(id =>
        items.find(item =>
          item.id === id))
      .filter(item => item !== undefined)
      .slice(0, this._limit) as typeof items;

    const previousPage = this._page > 1
      ? this._page - 1
      : undefined;

    const nextPage = this._page < lastPage
      ? this._page + 1
      : undefined;

    const meta: Meta = {
      currentPage: this._page,
      previousPage,
      nextPage,
      lastPage,
    };

    return { goods, meta };
  }

  public async getFilterByOptions(): Promise<{ name: string, title: string; }[]> {
    const filterByOptions = (await this.model.getAvailableFields()) as string[];

    const filterByMap = {
      'default': 'Без фильтрации',
      'brand': 'Бренд',
      'product': 'Название',
      'price': 'Цена'
    };

    return [
      {
        name: 'default',
        title: filterByMap.default,
      }
      ,
      ...filterByOptions
        .map(option =>
        ({
          name: option,
          title: filterByMap[option as keyof typeof filterByMap]
        })
        )
    ];
  }

  public async getValuesOfField(field: string) {
    const offset = getOffset(this._limit, this._page);

    const values = await this.model.getFields(field, offset, this._limit);

    const sortedValues = [...(new Set(values))].sort((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
      }
      return a > b ? 1 : -1;
    });

    console.log(sortedValues);
    return sortedValues;
  }

  public async getFilteredGoods(param: string, value: string | number) {
    const ids = await this.model.getFiltered(param, value);
    const goods = await this.model.getItems(ids);

    return goods;
  }
}

function getOffset(limit: number, page: number) {
  return (page - 1) * limit;
}
