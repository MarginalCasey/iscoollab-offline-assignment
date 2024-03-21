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

function parseCategoryListData(data: fetchMenuResponse["category_list_json"]) {
  const { schema, data: categoryData } = data;
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

  return categoryList;
}

function parseProductListData(
  data: fetchMenuResponse["product_list_json"],
  combineData: fetchMenuResponse["combine_list_json"]
) {
  const { schema, data: productData } = data;
  const products = Object.values(productData).reduce((obj, product) => {
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
      [product[schema.product_id] as number]: {
        id: product[schema.product_id],
        sort: product[schema.sort],
        name: product[schema.name],
        price: product[schema.price],
        temperature,
      } as Product,
    };
  }, {});

  return products;
}

function fetchMenu(): Promise<Menu> {
  return fetch("/menu.json")
    .then<fetchMenuResponse>((response) => response.json())
    .then<Menu>((data) => {
      return {
        categoryList: parseCategoryListData(data.category_list_json),
        products: parseProductListData(
          data.product_list_json,
          data.combine_list_json
        ),
      };
    });
}

export default fetchMenu;
