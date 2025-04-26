import { render, RenderOptions } from "@testing-library/react";
import React, { ReactElement } from "react";

// Add any providers that components need here (e.g., theme, store, router)
const AllTheProviders = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
): ReturnType<typeof render> => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
