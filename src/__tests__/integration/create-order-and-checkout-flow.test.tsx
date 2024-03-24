import App from "@/App";
import { mockCartItem } from "@/__tests__/mocks";
import * as checkout from "@/providers/checkout";
import * as fetchOrderHistory from "@/providers/fetchOrderHistory";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";
import MenuJson from "../../../public/menu.json";

const checkoutSpy = jest.spyOn(checkout, "default");
checkoutSpy.mockResolvedValue();

const fetchOrderHistorySpy = jest.spyOn(fetchOrderHistory, "default");
const orderedAt = Date.now();
const mockOrderHistory = [
  {
    orderId: "orderId",
    orderedAt,
    orderProducts: [mockCartItem],
    totalPrice: 75,
  },
];
fetchOrderHistorySpy.mockResolvedValue(mockOrderHistory);

describe("Create order and checkout flow", () => {
  beforeAll(() => {
    fetchMock.mockResponse(JSON.stringify(MenuJson));
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("default", async () => {
    window.history.pushState({}, "home page", "/");

    render(<App />);

    /* menu page */
    expect(window.location.pathname).toBe("/menu");
    await screen.findByTestId("menu");

    const item = screen.getByTestId(`product-${1337702200}`);
    await userEvent.click(item);
    await screen.findByTestId("order-dialog");

    await userEvent.click(screen.getByRole("button", { name: "L" }));
    await userEvent.click(screen.getByRole("button", { name: "去冰" }));
    await userEvent.click(screen.getByRole("button", { name: "無糖" }));
    await userEvent.click(screen.getByRole("button", { name: "加入購物車" }));

    expect(screen.queryByTestId("order-dialog")).not.toBeInTheDocument();
    expect(within(item).getByTestId("product-amount").textContent).toBe("1");
    expect(screen.getByTestId("cart-item-amount").textContent).toBe("1");

    await userEvent.click(screen.getByRole("link", { name: "購物車 1" }));

    /* cart page */
    expect(window.location.pathname).toBe("/cart");
    expect(screen.getByText("巨峰葡啵綠")).toBeInTheDocument();
    expect(screen.getByText("L / 去冰 / 無糖 / $75 / 1份")).toBeInTheDocument();
    expect(screen.getByText("商品 * 1")).toBeInTheDocument();
    expect(screen.getByTestId("total-product-price")).toHaveTextContent("$75");

    await userEvent.click(
      screen.getByRole("button", { name: "完成付款並購買" })
    );

    /* history page */
    expect(window.location.pathname).toBe("/history");
    await screen.findByText("過往訂單");
    expect(
      screen.getByText(`購買於 ${new Date(orderedAt).toLocaleString()}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText("1x 巨峰葡啵綠【L | 去冰 | 無糖】")
    ).toBeInTheDocument();
    expect(screen.getByText("$ 75")).toBeInTheDocument();
  });
});
