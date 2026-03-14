import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Navbar from "./Navbar.jsx";
import { CartContext } from "./Contexts.js";

describe("Navigation bar", () => {
  it("links open correct pages", async () => {
    render(
      <CartContext value={{ products: [] }}>
        <Navbar />
      </CartContext>,
      { wrapper: MemoryRouter },
    );
    const homeLink = screen.getByRole("link", {
      name: "Fables",
    });
    expect(homeLink).toHaveAttribute("href", "/");
    const shopLink = screen.getByRole("link", {
      name: "Shop all",
    });
    expect(shopLink).toHaveAttribute("href", "/shop");
    const cartLink = screen.getByRole("link", {
      name: "Cart",
    });
    expect(cartLink).toHaveAttribute("href", "/cart");
  });
});
