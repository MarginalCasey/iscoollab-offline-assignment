import { renderWithRouter } from "@/__tests__/testUtils";
import type { Cart } from "@/types";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";
import { useState } from "react";
import MenuJson from "../../../../public/menu.json";
import ShoppingCart from "../index";

const mockCartItem = {
  id: 1337702200,
  amount: 1,
  adjusts: {
    1337702209: {
      id: 1337702209,
      options: {
        1337702218: {
          id: 1337702218,
          amount: 1,
        },
      },
    },
    1337702326: {
      id: 1337702326,
      options: {
        1337702419: {
          id: 1337702419,
          amount: 1,
        },
      },
    },
    1337702329: {
      id: 1337702329,
      options: {
        1337702362: {
          id: 1337702362,
          amount: 1,
        },
      },
    },
  },
  totalPrice: 75,
};

const TestComponent = ({ value }: { value: Cart }) => {
  const [shoppingCart, setShoppingCart] = useState(value);

  return (
    <ShoppingCart
      shoppingCart={shoppingCart}
      setShoppingCart={setShoppingCart}
    />
  );
};

describe("ShoppingCart", () => {
  beforeAll(() => {
    fetchMock.mockResponse(JSON.stringify(MenuJson));
  });

  afterAll(() => {
    fetchMock.resetMocks();
  });

  it("should render empty page", async () => {
    renderWithRouter(<TestComponent value={[]} />);
    expect(screen.getByText("購物車內容為空")).toBeInTheDocument();
  });

  it("should render default", async () => {
    renderWithRouter(<TestComponent value={[mockCartItem]} />);

    await screen.findByText("購物內容");
    expect(screen.getByText("巨峰葡啵綠")).toBeInTheDocument();
    expect(screen.getByText("商品 * 1")).toBeInTheDocument();
    expect(screen.getByTestId("total-product-price")).toHaveTextContent("$75");
  });

  it("should update cart if user remove an item", async () => {
    renderWithRouter(<TestComponent value={[mockCartItem]} />);

    await screen.findByText("購物內容");
    expect(screen.getByText("巨峰葡啵綠")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "刪除" }));
    await screen.findByText("購物車內容為空");
    expect(screen.queryByText("巨峰葡啵綠")).not.toBeInTheDocument();
  });

  it("should update cart if user update an item", async () => {
    renderWithRouter(<TestComponent value={[mockCartItem]} />);

    await screen.findByText("購物內容");
    expect(screen.getByText("巨峰葡啵綠")).toBeInTheDocument();
    expect(screen.getByText("L / 去冰 / 無糖 / $75 / 1份")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "編輯" }));
    await screen.findByTestId("order-dialog");

    await userEvent.click(screen.getByRole("button", { name: "一分糖" }));
    await userEvent.click(screen.getByRole("button", { name: "更新商品" }));
    expect(
      screen.getByText("L / 去冰 / 一分糖 / $75 / 1份")
    ).toBeInTheDocument();
  });
});
