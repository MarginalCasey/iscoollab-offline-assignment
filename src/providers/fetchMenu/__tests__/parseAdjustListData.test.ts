import { parseAdjustListData } from "../index";

describe("parseAdjustListData", () => {
  it("should correctly parse adjust list data", () => {
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
        option_list: 16,
        vendor_custom_id: 17,
      },
      data: {
        "1337702209": [
          1337702209,
          1,
          "杯型",
          null,
          null,
          3,
          null,
          10,
          true,
          0,
          1,
          1,
          true,
          false,
          true,
          true,
          [
            1337702212, 1337702302, 1337702224, 1337702215, 1337702218,
            1337702221, 1337702227, 1337702230, 1337702233, 1337702236,
            1337702239, 1337702248, 1337702242, 1337702245, 1337702290,
            1337702287, 1337702251, 1337702254, 1337702257, 1337702260,
            1337702263, 1337702266, 1337702269, 1337702272, 1337702275,
            1337702278, 1337702281, 1337702284, 1337702293, 1337702296,
            1337702299, 1337702305, 1337702308, 1337702311, 1337702314,
            1337702317, 1337702320, 1337702323,
          ],
          "Cupsize_Title",
        ],
      },
    };

    const expectedOutput = {
      1337702209: {
        id: 1337702209,
        sort: 1,
        name: "杯型",
        subType: 10,
        isMandatory: true,
        minLimit: 0,
        maxLimit: 1,
        optionList: [
          1337702212, 1337702302, 1337702224, 1337702215, 1337702218,
          1337702221, 1337702227, 1337702230, 1337702233, 1337702236,
          1337702239, 1337702248, 1337702242, 1337702245, 1337702290,
          1337702287, 1337702251, 1337702254, 1337702257, 1337702260,
          1337702263, 1337702266, 1337702269, 1337702272, 1337702275,
          1337702278, 1337702281, 1337702284, 1337702293, 1337702296,
          1337702299, 1337702305, 1337702308, 1337702311, 1337702314,
          1337702317, 1337702320, 1337702323,
        ],
      },
    };

    expect(parseAdjustListData(input)).toEqual(expectedOutput);
  });
});