import "./Good.css";

interface Props {
  id: string;
  brand: string | null;
  price: number;
  product: string;
}

export default function Good({
  brand,
  id,
  price,
  product,
}: Props): HTMLDivElement {
  const good = document.createElement('div');
  good.classList.add('good');

  good.innerHTML = `
    <div class="good__brand">${brand || 'No name'}</div>
    <div class="good__id">${id}</div>
    <div class="good__name">${product}</div>
    <div calss="good__price">Цена: ${price}</div>
  `;

  return good;
}
