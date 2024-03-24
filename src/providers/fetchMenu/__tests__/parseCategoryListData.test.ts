import { parseCategoryListData } from "../index";

describe("parseCategoryListData", () => {
  it("should correctly parse category list data", () => {
    const input = {
      schema: {
        product_id: 0,
        sort: 1,
        name: 2,
        description: 3,
        is_enable: 4,
        is_visible: 5,
        category_list: 6,
        product_list: 7,
        vendor_custom_id: 8,
      },
      data: {
        "1337702017": [
          1337702017,
          6,
          "牧場鮮奶茶",
          null,
          true,
          true,
          [],
          [
            1337702041, 1337702038, 1337702116, 1337702119, 1337702098,
            1337702122, 1337702143, 1337702146, 1337702149,
          ],
          "1",
        ],
      },
    };

    const expectedOutput = {
      1337702017: {
        id: 1337702017,
        sort: 6,
        name: "牧場鮮奶茶",
        productList: [
          1337702041, 1337702038, 1337702116, 1337702119, 1337702098,
          1337702122, 1337702143, 1337702146, 1337702149,
        ],
      },
    };

    expect(parseCategoryListData(input)).toEqual(expectedOutput);
  });
});
