import type { OrderHistoryRecord } from "@/types";
import localforage from "localforage";

async function clearOrderHistory(): Promise<void> {
  await localforage.setItem<OrderHistoryRecord[]>("orderHistory", []);
}

export default clearOrderHistory;
