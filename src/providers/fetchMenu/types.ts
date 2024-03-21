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
  adjustList: number[];
  temperature: string[];
  availableOptions: {
    [optionId: number]: true;
  };
}

export interface Adjust {
  id: number;
  sort: number;
  name: string;
  subType: number;
  isMandatory: boolean;
  minLimit: number;
  maxLimit: number;
  optionList: number[];
}

export interface Option {
  id: number;
  sort: number;
  name: string;
  price: number;
  adjustId: number;
}

export interface Menu {
  categories: {
    [id: number]: Category;
  };
  products: {
    [id: number]: Product;
  };
  adjusts: {
    [id: number]: Adjust;
  };
  options: {
    [id: number]: Option;
  };
}
