export interface Category {
  id: number;
  name: string;
  productList: number[];
}

export interface Menu {
  categoryList: Category[];
}
