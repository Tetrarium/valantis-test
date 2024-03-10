interface Props {
  root: HTMLElement;
  title: string;
  name: string;
  options: {
    name: string,
    title: string,
  }[];
  onChange: (value: string) => void;
}

export default function createSelect({ title, name, root, options, onChange }: Props): HTMLSelectElement {
  const labelEl = document.createElement('label');
  labelEl.classList.add('select');

  const titleEl = document.createElement('span');
  titleEl.classList.add('select__title');
  titleEl.textContent = title;

  const selectEl = document.createElement('select');
  selectEl.classList.add('select__list');
  selectEl.name = name;

  options.forEach(option => selectEl.insertAdjacentHTML('beforeend', `
     <option value="${option.name}">${option.title}</option>
  `));

  selectEl.addEventListener('change', () => {
    onChange(selectEl.value);
  });

  labelEl.appendChild(titleEl);
  labelEl.appendChild(selectEl);
  root.appendChild(labelEl);

  return selectEl;
}
