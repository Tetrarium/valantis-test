import "./style.css";

import { Page } from "./components/Page/Page";

const page = new Page(
  document.getElementById('app')!,
);
page.mount();
