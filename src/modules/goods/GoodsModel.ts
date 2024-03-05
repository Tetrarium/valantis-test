import { Api } from "@/API";
import { API_PASS, API_URL } from "@/config";
import { Model } from "@/types/model";

export class GoodsModel implements Model {
  private api: Api;

  constructor() {
    this.api = new Api(API_URL, API_PASS);
  }

  public async getAllIds() {
    return await this.api.action('get_ids');
  }

  public async getIds(limit: number, offset: number) {
    return await this.api.action('get_ids', {
      limit,
      offset,
    });
  }

  public async getItems(ids: string[]) {
    return await this.api.action('get_items', {
      ids
    });
  }

  public async getAvailableFields() {
    return await this.api.action('get_fields');
  }

  public async getFields(
    field: string,
    offset: number,
    limit: number
  ) {
    return await this.api.action('get_fields', {
      field,
      offset,
      limit,
    });
  }

  public async getFiltered(param: string, value: string | number) {
    return await this.api.action('filter', {
      [param]: value
    });
  }
}
