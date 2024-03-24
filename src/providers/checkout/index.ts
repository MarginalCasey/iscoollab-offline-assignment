import type { Cart, OrderHistoryRecord } from "@/types";
import localforage from "localforage";
import { v4 as uuidv4 } from "uuid";

function checkout(data: Cart): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      localforage
        .getItem<OrderHistoryRecord[]>("orderHistory")
        .then((value) => {
          localforage.setItem<OrderHistoryRecord[]>("orderHistory", [
            ...(value ?? []),
            {
              orderId: uuidv4(),
              orderedAt: Date.now(),
              orderProducts: data,
              totalPrice: data.reduce((acc, item) => acc + item.totalPrice, 0),
            },
          ]);
        });
      resolve();
    }, 2000);
  });
}

export default checkout;
