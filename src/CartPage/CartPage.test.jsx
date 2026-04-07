import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CartPage from "./CartPage.jsx";
import { CartContext } from "../Contexts.js";
import { useState } from "react";
import PropTypes from "prop-types";

const TestWrapper = ({ children, initialProducts }) => {
  const [products] = useState(initialProducts);
  return <CartContext value={{ products }}>{children}</CartContext>;
};

TestWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  initialProducts: PropTypes.arrayOf(PropTypes.object),
};

describe("Cart page", () => {
  it("render cart page", () => {
    render(
      <CartContext value={{ products: [] }}>
        <CartPage />
      </CartContext>,
      { wrapper: MemoryRouter },
    );

    expect(screen.getByRole("heading")).toHaveTextContent("Cart");
  });
});
