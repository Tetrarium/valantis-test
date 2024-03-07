import "./Button.css";

interface Props {
  title: string;
  onClick?: (page: number) => void;
}

export function ChangePageBtn({ title, onClick }: Props) {
  const button = document.createElement('button');
  button.classList.add('button');
  button.textContent = title;

  console.log(onClick);

  if (onClick) {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      console.log('click');
      onClick(Number(button.dataset.page!));
    });
  }

  return button;
}
