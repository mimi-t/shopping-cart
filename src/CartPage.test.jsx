import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CartPage from "./CartPage.jsx";

describe("Cart page", () => {
  it("render cart page", () => {
    render(<CartPage />, { wrapper: MemoryRouter });

    expect(screen.getByRole("heading")).toHaveTextContent("Cart");
  });
});
