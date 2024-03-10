import { GoodsController } from "@/modules/goods/GoodsController";

import createSelect from "../UI/Select/Select";

export default class Filter {
  private element!: HTMLElement;
  private root!: HTMLElement;

  // private filterByEl!: HTMLSelectElement;

  private controller: GoodsController;

  // private handler: () => void;

  constructor(root: HTMLElement, controller: GoodsController, /* handler: () => void */) {
    this.root = root;
    this.controller = controller;

    // this.handler = handler;

    this.handlerFilterByChange = this.handlerFilterByChange.bind(this);
  }

  async createFilter() {
    this.element = document.createElement('div');
    this.element.classList.add('filter');

    const options = await this.controller.getFilterByOptions();
    console.log(options);

    createSelect({
      title: 'Фильтровать по: ',
      name: 'filter-by',
      root: this.element,
      options,
      onChange: this.handlerFilterByChange
    });

  }

  handlerFilterByChange(value: string) {
    console.log(value);
  }

  mount() {
    this.createFilter();
    this.root.appendChild(this.element);
  }
};
