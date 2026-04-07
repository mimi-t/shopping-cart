import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ShopPage from "./ShopPage.jsx";

describe("Shop page", () => {
  it("renders shop page", () => {
    render(<ShopPage />, { wrapper: MemoryRouter });
    expect(screen.getByRole("heading")).toHaveTextContent("Shop");
  });
});
