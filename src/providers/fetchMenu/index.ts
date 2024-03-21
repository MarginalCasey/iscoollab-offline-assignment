import type { Category, Menu } from "./types";

interface JsonType<SchemaFields extends string> {
  schema: {
    [field_name in SchemaFields]: number;
  };
  data: {
    [category_id: number]: unknown[];
  };
}

interface fetchMenuResponse {
  category_list_json: JsonType<"product_id" | "sort" | "name" | "product_list">;
}

function fetchMenu(): Promise<Menu> {
  return fetch("/menu.json")
    .then<fetchMenuResponse>((response) => response.json())
    .then<Menu>((data) => {
      console.log(data);

      const { schema, data: categoryData } = data.category_list_json;
      const categoryList = Object.values(categoryData)
        .sort((a, b) => {
          const orderA = a[schema.sort] as number;
          const orderB = b[schema.sort] as number;
          return orderA - orderB;
        })
        .map((category) => {
          return {
            id: category[schema.product_id],
            name: category[schema.name],
            productList: category[schema.product_list],
          } as Category;
        });

      return {
        categoryList,
      };
    });
}

export default fetchMenu;
