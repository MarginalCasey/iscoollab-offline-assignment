import type { Dictionary } from "@/types";
import type { Adjust, Category, Menu, Option, Product } from "./types";

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
    | "product_id"
    | "sort"
    | "name"
    | "price"
    | "adjust_list"
    | "option_list"
    | "combine_list"
  >;
  combine_list_json: {
    common_schema: {
      [field_name in "name" | "price"]: number;
    };
  } & JsonType<"common_list" | "edge_list">;
  adjust_list_json: JsonType<
    | "product_id"
    | "sort"
    | "name"
    | "sub_type"
    | "is_mandatory"
    | "min_limit"
    | "max_limit"
    | "option_list"
  >;
  option_list_json: JsonType<
    "product_id" | "sort" | "name" | "price" | "adjust_id"
  >;
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
  const {
    schema: combineSchema,
    common_schema: commonSchema,
    data: combineListData,
  } = combineData;

  return Object.values(productData).reduce<Dictionary<Product>>(
    (obj, product) => {
      const id = product[schema.product_id] as number;
      const sort = product[schema.sort] as number;
      const name = product[schema.name] as string;
      const price = product[schema.price] as number;
      const adjustList = product[schema.adjust_list] as number[];

      let temperature: string[] = [];
      let availableOptions = {};

      const combineList = product[schema.combine_list] as number[];
      combineList.forEach((combineListId) => {
        const productCombineData = combineListData[combineListId];

        const productCommonListData = productCombineData[
          combineSchema.common_list
        ] as unknown[];
        const temperatureListData = productCommonListData[1] as unknown[][];
        if (temperatureListData) {
          temperature = temperatureListData.map(
            (temperatureData) => temperatureData[commonSchema.name]
          ) as string[];
        }

        const productEdgeListData = productCombineData[
          combineSchema.edge_list
        ] as unknown[];
        availableOptions = Object.keys(productEdgeListData).reduce(
          (obj, key) => ({
            ...obj,
            [key]: true,
          }),
          availableOptions
        );
      });

      return {
        ...obj,
        [id]: {
          id,
          sort,
          name,
          price,
          adjustList,
          temperature,
          availableOptions,
        },
      };
    },
    {}
  );
}

function parseAdjustListData(
  data: fetchMenuResponse["adjust_list_json"]
): Dictionary<Adjust> {
  const { schema, data: adjustData } = data;
  return Object.values(adjustData).reduce<Dictionary<Adjust>>((obj, adjust) => {
    const id = adjust[schema.product_id] as number;
    const sort = adjust[schema.sort] as number;
    const name = adjust[schema.name] as string;
    const subType = adjust[schema.sub_type] as number;
    const isMandatory = adjust[schema.is_mandatory] as boolean;
    const minLimit = adjust[schema.min_limit] as number;
    const maxLimit = adjust[schema.max_limit] as number;
    const optionList = adjust[schema.option_list] as number[];

    return {
      ...obj,
      [id]: {
        id,
        sort,
        name,
        subType,
        isMandatory,
        minLimit,
        maxLimit,
        optionList,
      },
    };
  }, {});
}

function parseOptionListData(
  data: fetchMenuResponse["option_list_json"]
): Dictionary<Option> {
  const { schema, data: adjustData } = data;
  return Object.values(adjustData).reduce<Dictionary<Option>>((obj, option) => {
    const id = option[schema.product_id] as number;
    const sort = option[schema.sort] as number;
    const name = option[schema.name] as string;
    const price = option[schema.price] as number;
    const adjustId = option[schema.adjust_id] as number;

    return {
      ...obj,
      [id]: {
        id,
        sort,
        name,
        price,
        adjustId,
      },
    };
  }, {});
}

function fetchMenu(): Promise<Menu> {
  return fetch("/menu.json")
    .then<fetchMenuResponse>((response) => response.json())
    .then<Menu>((data) => ({
      categories: parseCategoryListData(data.category_list_json),
      products: parseProductListData(
        data.product_list_json,
        data.combine_list_json
      ),
      adjusts: parseAdjustListData(data.adjust_list_json),
      options: parseOptionListData(data.option_list_json),
    }));
}

export default fetchMenu;
