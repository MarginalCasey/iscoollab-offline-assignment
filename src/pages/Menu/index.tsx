import fetchMenu from "@/providers/fetchMenu";
import type { Menu } from "@/providers/fetchMenu/types";
import { useQuery } from "@tanstack/react-query";
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
  if (isFetching) return null;

  const { categoryList, products } = data as Menu;

  return (
    <Container>
      {categoryList.map((category) => (
        <Category key={category.id}>
          <Title>{category.name}</Title>
          {category.productList
            .sort((a, b) => products[a].sort - products[b].sort)
            .map((productId) => {
              const product = products[productId];

              return (
                <Product key={productId}>
                  <ProductTitle>{product.name}</ProductTitle>
                  <div>{product.price}</div>
                  <div>{product.temperature.join(", ")}</div>
                </Product>
              );
            })}
        </Category>
      ))}
    </Container>
  );
}

export default Menu;
