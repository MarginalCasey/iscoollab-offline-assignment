import { parseOptionListData } from "../index";

describe("parseOptionListData", () => {
  it("should correctly parse option list data", () => {
    const input = {
      schema: {
        product_id: 0,
        sort: 1,
        name: 2,
        description: 3,
        price: 4,
        price_type: 5,
        calorie: 6,
        sub_type: 7,
        is_mandatory: 8,
        min_limit: 9,
        max_limit: 10,
        default_num: 11,
        is_common: 12,
        is_default: 13,
        is_enable: 14,
        is_visible: 15,
        adjust_id: 16,
        vendor_custom_id: 17,
      },
      data: {
        "1337702215": [
          1337702215,
          3,
          "M",
          null,
          0,
          3,
          null,
          14,
          false,
          0,
          1,
          1,
          true,
          false,
          true,
          true,
          1337702209,
          "Cupsize_1",
        ],
      },
    };

    const expectedOutput = {
      1337702215: {
        id: 1337702215,
        sort: 3,
        name: "M",
        price: 0,
        adjustId: 1337702209,
      },
    };

    expect(parseOptionListData(input)).toEqual(expectedOutput);
  });
});
