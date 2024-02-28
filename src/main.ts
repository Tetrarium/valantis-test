import './style.css';
import { GoodsModel } from './modules/goods/GoodsModel';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `Hello, World!!!`;

const goodsModel = new GoodsModel;

// console.log(goodaModel);

// goodaModel.limit = 10;

(async function () {
  await goodsModel.fetchIds();
  await goodsModel.fetchItems();
  await goodsModel.fetchFields();

  console.log(goodsModel.getIds());
  console.log(new Set(goodsModel.getIds()));
  console.log(goodsModel.getItems());
})();