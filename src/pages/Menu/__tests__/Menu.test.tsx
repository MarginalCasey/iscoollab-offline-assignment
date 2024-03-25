import { renderWithProviders } from "@/__tests__/testUtils";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";
import MenuJson from "../../../../public/menu.json";
import Menu from "../index";

describe("Menu", () => {
  beforeAll(() => {
    fetchMock.mockResponse(JSON.stringify(MenuJson));
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should render default", async () => {
    renderWithProviders(<Menu />);
    await screen.findByTestId("menu-page");
  });

  it("should update menu if user add new order", async () => {
    renderWithProviders(<Menu />);
    await screen.findByTestId("menu-page");

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
