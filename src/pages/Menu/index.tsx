import OrderDialog from "@/components/OrderDialog";
import useOrderDialog from "@/components/OrderDialog/useOrderDialog";
import fetchMenu from "@/providers/fetchMenu";
import type { Menu } from "@/providers/fetchMenu/types";
import type { Cart } from "@/types";
import { useQuery } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import {
  Category,
  Container,
  Product,
  ProductAmount,
  ProductTitle,
  Title,
} from "./index.style";

interface MenuProps {
  shoppingCart: Cart;
  setShoppingCart: Dispatch<SetStateAction<Cart>>;
}

function Menu({ shoppingCart, setShoppingCart }: MenuProps) {
  const { isFetching, data } = useQuery<Menu>({
    queryKey: ["menu"],
    queryFn: fetchMenu,
  });

  const {
    selectedProductId,
    openOrderDialog,
    closeOrderDialog,
    handleSubmitOrderDialog,
  } = useOrderDialog(shoppingCart, setShoppingCart);

  if (isFetching) return null;

  const { categories, products, adjusts, options } = data as Menu;
  return (
    <Container>
      {Object.values(categories)
        .sort((a, b) => a.sort - b.sort)
        .map((category) => (
          <Category key={category.id}>
            <Title>{category.name}</Title>
            {category.productList
              .sort((a, b) => products[a].sort - products[b].sort)
              .map((productId) => {
                const product = products[productId];
                const amount = shoppingCart.reduce((sum, order) => {
                  if (order.id === productId) return sum + order.amount;
                  return sum;
                }, 0);

                return (
                  <Product key={productId} onClick={openOrderDialog(productId)}>
                    <ProductTitle>
                      {product.name}
                      {amount > 0 && <ProductAmount>{amount}</ProductAmount>}
                    </ProductTitle>
                    <div>{product.price}</div>
                    <div>{product.temperature.join(", ")}</div>
                  </Product>
                );
              })}
          </Category>
        ))}
      {selectedProductId && (
        <OrderDialog
          products={products}
          adjusts={adjusts}
          options={options}
          productId={selectedProductId}
          onClose={closeOrderDialog}
          onSubmit={handleSubmitOrderDialog}
        />
      )}
    </Container>
  );
}

export default Menu;
