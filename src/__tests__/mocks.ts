import type { Order } from "@/types";

export const mockCartItem: Order = {
  id: 1337702200,
  amount: 1,
  adjusts: {
    1337702209: {
      id: 1337702209,
      options: {
        1337702218: {
          id: 1337702218,
          amount: 1,
        },
      },
    },
    1337702326: {
      id: 1337702326,
      options: {
        1337702419: {
          id: 1337702419,
          amount: 1,
        },
      },
    },
    1337702329: {
      id: 1337702329,
      options: {
        1337702362: {
          id: 1337702362,
          amount: 1,
        },
      },
    },
  },
  totalPrice: 75,
};
