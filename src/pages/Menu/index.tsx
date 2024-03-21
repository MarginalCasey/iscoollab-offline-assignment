import fetchMenu from "@/providers/fetchMenu";
import type { Menu } from "@/providers/fetchMenu/types";
import { useQuery } from "@tanstack/react-query";
import { Category, Container, Title } from "./index.style";

function Menu() {
  const { isFetching, data } = useQuery<Menu>({
    queryKey: ["menu"],
    queryFn: fetchMenu,
  });
  if (isFetching) return null;

  const { categoryList } = data as Menu;

  return (
    <Container>
      {categoryList.map((category) => (
        <Category key={category.id}>
          <Title>{category.name}</Title>
          {category.productList.map((productId) => (
            <div key={productId}>{productId}</div>
          ))}
        </Category>
      ))}
    </Container>
  );
}

export default Menu;
