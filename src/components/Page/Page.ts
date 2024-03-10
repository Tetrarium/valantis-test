import "./Page.css";

import { GoodsController, Meta } from "@/modules/goods/GoodsController";

import Filter from "./Filter/Filter";
import Good from "./Good/Good";
import { ChangePageBtn } from "./UI/Button/Button";

export class Page {
  private controller: GoodsController;

  private root: HTMLElement;
  private pageEl!: HTMLElement;
  private goodsContainer!: HTMLElement;
  private pageControl!: HTMLElement;

  private previousButton!: HTMLButtonElement;
  private nextButton!: HTMLButtonElement;
  private pageNumEl!: HTMLInputElement;

  private filter!: Filter;

  private debounceTimerId: number | null;

  constructor(root: HTMLElement) {
    this.root = root;
    this.controller = new GoodsController();

    this.handleClickChangePage = this.handleClickChangePage.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.renderFilteredGoods = this.renderFilteredGoods.bind(this);
    this.renderGoods = this.renderGoods.bind(this);

    this.debounceTimerId = null;
  }

  createPageEl(title: string) {
    this.pageEl = document.createElement('div');
    this.pageEl.classList.add('page');

    this.pageEl.insertAdjacentHTML('afterbegin', `
      <h1 class="page__header">${title}</h1>
    `);

    this.root.appendChild(this.pageEl);

    this.createPageControl();
    this.filter = new Filter(
      this.pageEl,
      this.controller,
      this.renderFilteredGoods,
      this.renderGoods,
    );
    this.filter.mount();
  }

  createPageControl() {
    this.pageControl = document.createElement('div');
    this.pageControl.classList.add('page__control');

    this.previousButton = ChangePageBtn({
      title: 'Previous Page',
      onClick: this.handleClickChangePage,
    });

    this.nextButton = ChangePageBtn({
      title: 'Next Page',
      onClick: this.handleClickChangePage,
    });

    this.pageNumEl = document.createElement('input');
    this.pageNumEl.type = 'number';
    this.pageNumEl.classList.add('page__number');
    this.pageNumEl.addEventListener('change', this.handleChangePage);

    this.pageControl.appendChild(this.previousButton);
    this.pageControl.appendChild(this.pageNumEl);
    this.pageControl.appendChild(this.nextButton);

    this.pageEl.appendChild(this.pageControl);
  }

  updatePageControl({ currentPage, previousPage, nextPage, lastPage }: Meta) {
    const DISABLED = 'disabled';
    this.nextButton.classList.remove(DISABLED);
    this.previousButton.classList.remove(DISABLED);

    if (!previousPage) {
      this.previousButton.classList.add(DISABLED);
    }
    if (!nextPage) {
      this.nextButton.classList.add(DISABLED);
    }

    this.nextButton.dataset.page = nextPage?.toString();
    this.previousButton.dataset.page = previousPage?.toString();

    this.pageNumEl.value = currentPage.toString();
    this.pageNumEl.min = '1';
    this.pageNumEl.max = String(lastPage);
  }

  createGoodsEl() {
    this.goodsContainer = document.createElement('div');
    this.goodsContainer.classList.add('page__goods');

    this.pageEl.appendChild(this.goodsContainer);
  }

  async renderGoods() {
    const page = this.controller.getPage();
    this.pageNumEl.textContent = String(page);

    this.goodsContainer.innerHTML = 'Loading...';
    await this.controller.setPage(page);
    const { goods, meta } = await this.controller.getGoods();

    this.updatePageControl(meta);

    this.goodsContainer.innerHTML = '';

    goods.forEach(good => this.goodsContainer.appendChild(
      Good(good)
    ));
  }

  async renderFilteredGoods(param: string, value: string | number) {
    console.log(this);
    this.goodsContainer.innerHTML = 'Loading...';

    const goods = await this.controller.getFilteredGoods(param, value);

    this.goodsContainer.innerHTML = '';

    goods.forEach(good => this.goodsContainer.appendChild(
      Good(good)
    ));
  }

  handleClickChangePage(page: number) {
    this.pageNumEl.value = String(page);

    this.handleChangePage();
  }

  async handleChangePage() {

    let value = Number(this.pageNumEl.value);

    const min = Number(this.pageNumEl.min);
    const max = Number(this.pageNumEl.max);

    value = value < min
      ? min
      : value > max
        ? max
        : value;

    this.pageNumEl.value = String(await this.controller.setPage(value));
    this.filter.setDefault();

    if (this.debounceTimerId) {
      clearTimeout(this.debounceTimerId);
      this.debounceTimerId = null;
    }

    this.debounceTimerId = setTimeout(() => {
      this.renderGoods();
    }, 300);
  }

  mount() {
    this.createPageEl('Список товаров');
    this.createGoodsEl();
    this.renderGoods();
  }
}
