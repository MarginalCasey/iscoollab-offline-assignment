import type { Dictionary } from "@/types";
import type { Category, Menu, Product } from "./types";

interface JsonType<SchemaFields extends string> {
  schema: {
    [field_name in SchemaFields]: number;
  };
  data: {
    [id: number]: unknown[];
  };
}

interface fetchMenuResponse {
  category_list_json: JsonType<"product_id" | "sort" | "name" | "product_list">;
  product_list_json: JsonType<
    "product_id" | "sort" | "name" | "price" | "adjust_list" | "combine_list"
  >;
  combine_list_json: {
    common_schema: {
      [field_name in "name" | "price"]: number;
    };
  } & JsonType<"common_list">;
}

function parseCategoryListData(
  data: fetchMenuResponse["category_list_json"]
): Dictionary<Category> {
  const { schema, data: categoryData } = data;
  return Object.values(categoryData).reduce<Dictionary<Category>>(
    (obj, category) => {
      const id = category[schema.product_id] as number;
      const sort = category[schema.sort] as number;
      const name = category[schema.name] as string;
      const productList = category[schema.product_list] as number[];

      return {
        ...obj,
        [id]: {
          id,
          sort,
          name,
          productList,
        },
      };
    },
    {}
  );
}

function parseProductListData(
  data: fetchMenuResponse["product_list_json"],
  combineData: fetchMenuResponse["combine_list_json"]
): Dictionary<Product> {
  const { schema, data: productData } = data;
  return Object.values(productData).reduce<Dictionary<Product>>(
    (obj, product) => {
      const id = product[schema.product_id] as number;
      const sort = product[schema.sort] as number;
      const name = product[schema.name] as string;
      const price = product[schema.price] as number;

      let temperature: string[] = [];

      const combineListId = product[schema.combine_list] as number;
      const {
        schema: combineSchema,
        common_schema: commonSchema,
        data: combineListData,
      } = combineData;
      const productCombineData = combineListData[combineListId];

      if (productCombineData) {
        const productCommonListData = productCombineData[
          combineSchema.common_list
        ] as unknown[];
        const temperatureListData = productCommonListData[1] as unknown[][];

        if (temperatureListData) {
          temperature = temperatureListData.map(
            (temperatureData) => temperatureData[commonSchema.name]
          ) as string[];
        }
      }

      return {
        ...obj,
        [id]: {
          id,
          sort,
          name,
          price,
          temperature,
        },
      };
    },
    {}
  );
}

function fetchMenu(): Promise<Menu> {
  return fetch("/menu.json")
    .then<fetchMenuResponse>((response) => response.json())
    .then<Menu>((data) => {
      return {
        categories: parseCategoryListData(data.category_list_json),
        products: parseProductListData(
          data.product_list_json,
          data.combine_list_json
        ),
      };
    });
}

export default fetchMenu;
