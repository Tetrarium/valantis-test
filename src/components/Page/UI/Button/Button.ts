import "./Button.css";

interface Props {
  title: string;
  onClick?: (page: number) => void;
}

export function ChangePageBtn({ title, onClick }: Props) {
  const button = document.createElement('button');
  button.classList.add('button');
  button.textContent = title;

  if (onClick) {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();

      onClick(Number(button.dataset.page!));
    });
  }

  return button;
}
