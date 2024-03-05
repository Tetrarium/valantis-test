// import { Api } from './API';
// import { API_PASS, API_URL, SHOW_LIMIT } from './config';
import './style.css';
// import { GoodsModel } from './modules/goods/GoodsModel';
import { Page } from './components/Page/Page';
// import { GoodsModel2 } from './modules/goods/GoodsModel2';

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `Hello, World!!!`;

// const goodsModel = new GoodsModel;

// console.log(goodaModel);

// goodaModel.limit = 10;

// (async function () {
// await goodsModel.fetchIds();

// await goodsModel.fetchItems();
// await goodsModel.fetchFields();

// console.log(goodsModel.getIds());
// console.log(new Set(goodsModel.getIds()));
// console.log(goodsModel.getItems());
// })();

const page = new Page(
  document.getElementById('app')!,
);
page.mount();

// const goodsModel2 = new GoodsModel2();

// (async function () {
//   await goodsModel2.fetchIds();
// })();

// const api = new Api(API_URL, API_PASS);
// console.log(api);

// api.action('get_ids', { limit: SHOW_LIMIT, offset: 0 })
//   .then(e => {
//     console.log(e);
//   })
//   .catch(e => console.log(e));
