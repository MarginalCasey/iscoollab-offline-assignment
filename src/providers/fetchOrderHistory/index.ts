import type { OrderHistoryRecord } from "@/types";
import localforage from "localforage";

function fetchOrderHistory(): Promise<OrderHistoryRecord[]> {
  return localforage
    .getItem<OrderHistoryRecord[]>("orderHistory")
    .then((value) => value ?? []);
}

export default fetchOrderHistory;
