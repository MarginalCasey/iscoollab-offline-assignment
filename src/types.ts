export interface Dictionary<T> {
  [id: number | string]: T;
}

export interface Order {
  id: number;
  amount: number;
  adjusts: {
    [id: number]: {
      id: number;
      options: {
        [id: number]: {
          id: number;
          amount: number;
        };
      };
    };
  };
  totalPrice: number;
}

export type Cart = Order[];
