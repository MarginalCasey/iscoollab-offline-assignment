function fetchMenu() {
  return fetch("/menu.json").then((response) => response.json());
}

export default fetchMenu;
