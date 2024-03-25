import clearOrderHistory from "@/providers/clearOrderHistory";
import fetchMenu from "@/providers/fetchMenu";
import type { Menu } from "@/providers/fetchMenu/types";
import fetchOrderHistory from "@/providers/fetchOrderHistory";
import type { OrderHistoryRecord } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ClearHistoryButton,
  Container,
  OrderDetail,
  OrderedAt,
  Section,
  Title,
  TotalPrice,
} from "./index.style";

function History() {
  const { isFetching: isFetchingMenu, data: menuData } = useQuery<Menu>({
    queryKey: ["menu"],
    queryFn: fetchMenu,
  });
  const {
    isFetching: isFetchingHistory,
    data: orderHistoryData,
    refetch: refetchOrderHistory,
  } = useQuery<OrderHistoryRecord[]>({
    queryKey: ["fetchOrderHistory"],
    queryFn: fetchOrderHistory,
  });
  const clearHistoryMutation = useMutation({
    mutationFn: clearOrderHistory,
    onSuccess: () => {
      refetchOrderHistory();
    },
  });

  if (isFetchingMenu || isFetchingHistory) return null;

  const { products, options } = menuData as Menu;
  const orderHistory = orderHistoryData as OrderHistoryRecord[];

  if (orderHistory.length === 0)
    return (
      <Container>
        <Section>訂單紀錄為空</Section>
      </Container>
    );

  const clearHistory = () => {
    clearHistoryMutation.mutate();
  };

  return (
    <Container data-testid="history-page">
      <Title>過往訂單</Title>
      {orderHistory.map((record) => {
        const orderedAt = new Date(record.orderedAt);

        return (
          <Section key={record.orderId}>
            <OrderedAt>購買於 {orderedAt.toLocaleString()}</OrderedAt>
            <TotalPrice>$ {record.totalPrice}</TotalPrice>
            <OrderDetail>
              {record.orderProducts.map((order) => {
                const orderDetail = Object.values(order.adjusts)
                  .map((adjust) => Object.values(adjust.options))
                  .flat()
                  .map((option) => {
                    const name = options[option.id].name;
                    const amount = option.amount;
                    return amount > 1 ? `${name}x${amount}` : name;
                  })
                  .join(" | ");

                return (
                  <div key={order.id}>
                    {`${order.amount}x`} {products[order.id].name}
                    {orderDetail && `【${orderDetail}】`}
                  </div>
                );
              })}
            </OrderDetail>
          </Section>
        );
      })}
      <ClearHistoryButton
        variant="contained"
        color="error"
        size="large"
        fullWidth
        onClick={clearHistory}
      >
        清除訂單紀錄
      </ClearHistoryButton>
    </Container>
  );
}

export default History;
