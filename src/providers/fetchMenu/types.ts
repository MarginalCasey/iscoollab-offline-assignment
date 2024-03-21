export interface Category {
  id: number;
  sort: number;
  name: string;
  productList: number[];
}

export interface Product {
  id: number;
  sort: number;
  name: string;
  price: number;
  temperature: string[];
}

export interface Menu {
  categories: {
    [id: number]: Category;
  };
  products: {
    [id: number]: Product;
  };
}
