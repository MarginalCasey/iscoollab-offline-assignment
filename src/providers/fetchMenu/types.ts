export interface Category {
  id: number;
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
  categoryList: Category[];
  products: {
    [id: number]: Product;
  };
}
