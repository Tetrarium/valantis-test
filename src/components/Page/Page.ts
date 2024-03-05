import { Api } from "@/API";
import { API_PASS, API_URL } from "@/config";
import { GoodsController } from "@/modules/goods/GoodsController";

export class Page {
  private controller: GoodsController;

  private root: HTMLElement;
  private pageEl!: HTMLElement;
  private goodsContainer!: HTMLElement;
  private api: Api;

  constructor(root: HTMLElement) {
    this.root = root;
    this.controller = new GoodsController();
    this.api = new Api(API_URL, API_PASS);
  }

  createPageEl(title: string) {
    this.pageEl = document.createElement('div');
    this.pageEl.classList.add('page');

    this.pageEl.insertAdjacentHTML('afterbegin', `
      <h1 class="page__header">${title}</h1>
    `);
  }

  createGoodsEl() {
    this.goodsContainer = document.createElement('div');
    this.goodsContainer.classList.add('page__goods');
  }

  async renderGoods() {
    this.goodsContainer.innerHTML = 'Loading...';
    // const goods = await this.controller.getGoods();
    // console.log(goods);

    // this.goodsContainer.innerHTML = goods
    //   .map(good => this.createGoodEl(good))
    //   .join(' ');
    const goods = await this.api.action('get_ids', {
      offset: 0,
      limit: 10,
    })
      .then(response => this.api.action('get_items', {
        ids: response!
      }));
    console.log(goods);
  }

  private createGoodEl(good: {
    brand: string | null;
    price: number;
    product: string;
  }) {
    return `
      <div class="good">
        <div class="good__brand">${good.brand || 'No name'}</div>
        <div class="good__name">${good.product}</div>
        <div calss="good__price">${good.price}</div>
      </div>
    `;
  }


  mount() {
    this.createPageEl('Список товаров');
    this.root.appendChild(this.pageEl);

    this.createGoodsEl();
    this.pageEl.appendChild(this.goodsContainer);

    this.renderGoods();
  }
}
