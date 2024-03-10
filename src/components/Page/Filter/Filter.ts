import "./Filter.css";

import { GoodsController } from "@/modules/goods/GoodsController";

import createSelect from "../UI/Select/Select";

export default class Filter {
  private element!: HTMLElement;
  private root!: HTMLElement;
  private filterValueContainer!: HTMLSpanElement;

  private filterBy!: HTMLSelectElement;

  private controller: GoodsController;

  handlerFilter: (param: string, typedValue: string | number) => void;
  handlerNoFilter: () => void;

  constructor(
    root: HTMLElement,
    controller: GoodsController,
    handlerFilter: (param: string, typedValue: string | number) => void,
    handlerNoFilter: () => void,
  ) {
    this.root = root;
    this.controller = controller;
    this.handlerFilter = handlerFilter;
    this.handlerNoFilter = handlerNoFilter;

    this.handlerFilterByChange = this.handlerFilterByChange.bind(this);
  }

  async createFilter() {
    this.element = document.createElement('div');
    this.element.classList.add('filter');

    const options = await this.controller.getFilterByOptions();

    this.filterBy = createSelect({
      title: 'Фильтровать по: ',
      name: 'filter-by',
      root: this.element,
      options,
      onChange: this.handlerFilterByChange
    });

    this.filterValueContainer = document.createElement('span');
    this.filterValueContainer.classList.add('filter__value');
    this.element.appendChild(this.filterValueContainer);
  }

  public setDefault() {
    this.filterBy.value = 'default';
    this.filterValueContainer.innerHTML = '';
  }

  async handlerFilterByChange(param: string) {

    this.filterValueContainer.innerHTML = '';

    if (param === 'default') {
      this.handlerNoFilter();
      return;
    }

    const values = await this.controller.getValuesOfField(param);
    const options = values.map(value => ({
      name: value,
      title: value || 'No name',
    }));

    createSelect({
      title: 'Значение: ',
      name: 'filter-value',
      root: this.filterValueContainer,
      options,
      onChange: (value) => { this.handleChangeValue(param, value); }
    });

    this.handleChangeValue(param, values[0]);
  }

  async handleChangeValue(param: string, value: string) {
    const typedValue = param === 'price' ? Number(value) : value;

    this.handlerFilter(param, typedValue);
  }

  mount() {
    this.createFilter();
    this.root.appendChild(this.element);
  }
};
