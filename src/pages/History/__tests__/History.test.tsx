import { mockCartItem } from "@/__tests__/mocks";
import { renderWithProviders } from "@/__tests__/testUtils";
import * as clearOrderHistory from "@/providers/clearOrderHistory";
import * as fetchOrderHistory from "@/providers/fetchOrderHistory";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from "jest-fetch-mock";
import MenuJson from "../../../../public/menu.json";
import History from "../index";

const orderedAt = Date.now();

const mockOrderHistory = [
  {
    orderId: "orderId",
    orderedAt,
    orderProducts: [mockCartItem],
    totalPrice: 75,
  },
];
const fetchOrderHistorySpy = jest.spyOn(fetchOrderHistory, "default");
const clearOrderHistorySpy = jest.spyOn(clearOrderHistory, "default");

describe("History", () => {
  beforeAll(() => {
    fetchMock.mockResponse(JSON.stringify(MenuJson));
    clearOrderHistorySpy.mockResolvedValue();
  });

  afterEach(() => {
    fetchOrderHistorySpy.mockReset();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should render empty page", async () => {
    fetchOrderHistorySpy.mockResolvedValueOnce([]);
    renderWithProviders(<History />);

    await screen.findByText("訂單紀錄為空");
  });

  it("should render default", async () => {
    fetchOrderHistorySpy.mockResolvedValueOnce(mockOrderHistory);
    renderWithProviders(<History />);

    await screen.findByText("過往訂單");
    expect(
      screen.getByText(`購買於 ${new Date(orderedAt).toLocaleString()}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText("1x 巨峰葡啵綠【L | 去冰 | 無糖】")
    ).toBeInTheDocument();
    expect(screen.getByText("$ 75")).toBeInTheDocument();
  });

  it("should update if user clear all histories", async () => {
    fetchOrderHistorySpy.mockResolvedValueOnce(mockOrderHistory);
    renderWithProviders(<History />);

    await screen.findByText("過往訂單");
    expect(
      screen.getByText("1x 巨峰葡啵綠【L | 去冰 | 無糖】")
    ).toBeInTheDocument();

    fetchOrderHistorySpy.mockResolvedValueOnce([]);

    await userEvent.click(screen.getByRole("button", { name: "清除訂單紀錄" }));
    await screen.findByText("訂單紀錄為空");
    expect(
      screen.queryByText("1x 巨峰葡啵綠【L | 去冰 | 無糖】")
    ).not.toBeInTheDocument();
  });
});
