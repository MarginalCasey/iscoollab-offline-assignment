import fetchMenu from "@/providers/fetchMenu";
import type { Menu } from "@/providers/fetchMenu/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import OrderDialog from "./OrderDialog";
import {
  Category,
  Container,
  Product,
  ProductTitle,
  Title,
} from "./index.style";

function Menu() {
  const { isFetching, data } = useQuery<Menu>({
    queryKey: ["menu"],
    queryFn: fetchMenu,
  });

  const [selectedProductId, setSelectedProductId] = useState<number>();
  const openOrderDialog = (productId: number) => () => {
    setSelectedProductId(productId);
  };
  const closeOrderDialog = () => {
    setSelectedProductId(undefined);
  };

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

                return (
                  <Product key={productId} onClick={openOrderDialog(productId)}>
                    <ProductTitle>{product.name}</ProductTitle>
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
        />
      )}
    </Container>
  );
}

export default Menu;
