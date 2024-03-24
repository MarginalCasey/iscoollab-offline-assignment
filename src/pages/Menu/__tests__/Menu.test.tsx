import { renderWithRouter } from "@/__tests__/testUtils";
import type { Cart } from "@/types";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";
import { useState } from "react";
import MenuJson from "../../../../public/menu.json";
import Menu from "../index";

const TestComponent = ({ value }: { value: Cart }) => {
  const [shoppingCart, setShoppingCart] = useState(value);

  return <Menu shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} />;
};

describe("Menu", () => {
  beforeAll(() => {
    fetchMock.mockResponse(JSON.stringify(MenuJson));
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should render default", async () => {
    renderWithRouter(<TestComponent value={[]} />);
    await screen.findByTestId("menu");
  });

  it("should update menu if user add new order", async () => {
    renderWithRouter(<TestComponent value={[]} />);
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
  });
});
