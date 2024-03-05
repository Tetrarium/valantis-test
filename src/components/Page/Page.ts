import { SHOW_LIMIT } from "@/config";
import { GoodsController } from "@/modules/goods/GoodsController";

export class Page {
  private controller: GoodsController;

  private root: HTMLElement;
  private pageEl!: HTMLElement;
  private goodsContainer!: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
    this.controller = new GoodsController();
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
    const goods = await this.controller.getGoods(SHOW_LIMIT, 1);

    console.log(goods);

    this.goodsContainer.innerHTML = goods
      .map(good => this.createGoodEl(good))
      .join(' ');
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
