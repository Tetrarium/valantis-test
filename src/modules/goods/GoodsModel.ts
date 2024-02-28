import { fetchData } from '@/fetch/fetch';
import { Model } from '@/types/model';

export class GoodsModel implements Model {
  private ids: string[];
  private items: object[];
  private _offset: number;
  private _limit: number;
  private fields: string[];
  private fieldValues: string[];

  constructor() {
    this.ids = [];
    this._offset = 0;
    this._limit = 100;
    this.items = [];
    this.fields = [];
    this.fieldValues = [];
  }

  get offset(): number {
    return this._offset;
  }

  set offset(value: number) {
    this._offset = value;

    this.fetchIds();
  }

  get limit(): number {
    return this._limit;
  }

  set limit(value: number) {
    this._limit = value;
    this.fetchIds();
  }

  async fetchIds() {
    const result = await fetchData('get_ids', {
      offset: this._offset,
      limit: this._limit,
    });

    if (result.ok) {
      // console.log(result.data?.result);
      const set: Set<string> = new Set(result.data!.result);

      this.ids = [...set];
      // console.log(this.ids);
    }
  }

  getIds() {
    return this.ids;
  }

  async fetchItems() {
    const result = await fetchData('get_items', {
      ids: this.ids
    });

    if (result.ok) {
      const items = result.data!.result;
      this.items = this.ids.map(item =>
        items.find((elem: { id: string; }) => elem.id === item));
    }
  }

  getItems() {
    return this.items;
  }

  async fetchFields() {
    const result = await fetchData('get_fields');

    if (result.ok) {
      console.log(result);
      this.fields = result.data?.result;
    } else {
      // console.log(result.error);
    }
  }

  getFields() {
    return this.fields;
  }

  getField(index: number) {
    return this.fields[index];
  }

  async fetchFieldValues(field: string) {
    const result = await fetchData('get_fields', {
      field,
      offset: 0,
      limit: 10,
    });

    if (result.ok) {
      this.fieldValues = result.data?.result;
    } else {
      console.log(result.error);
    }
  }

  getFieldValues() {
    return this.fieldValues;
  }

  async fetchFilteredIds(field: string, value: string | number) {
    const result = await fetchData('filter', {
      [field]: value
    });

    if (result.ok) {
      this.ids = result.data?.result;
    } else {
      console.log(result.error);
    }
  }
}