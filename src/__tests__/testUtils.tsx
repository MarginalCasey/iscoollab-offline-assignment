import type { RootState } from "@/store";
import { setupStore } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render as defaultRender } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

interface RenderWithProvidersOptions {
  route?: string;
  withRouter?: boolean;
  initialState?: RootState;
}

export const renderWithProviders = (
  ui: ReactNode,
  {
    route = "/",
    withRouter = true,
    initialState = undefined,
  }: RenderWithProvidersOptions = {}
) => {
  window.history.pushState({}, "Test page", route);
  const store = setupStore(initialState);

  const Providers = ({ children }: { children: ReactNode }) => {
    if (withRouter) {
      return (
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>{children}</BrowserRouter>
          </QueryClientProvider>
        </Provider>
      );
    }

    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    );
  };

  return {
    user: userEvent.setup(),
    ...defaultRender(ui, { wrapper: Providers }),
  };
};
