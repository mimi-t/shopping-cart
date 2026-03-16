import { render, screen } from "@testing-library/react";
import CartItem from "./CartItem";
import { CartContext } from "./Contexts.js";

describe("Cart item", () => {
  it("render cart item", () => {
    const item = {
      id: 1,
      quantity: 1,
      title: "Essence Mascara Lash Princess",
      price: 9.99,
      thumbnail:
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    };
    render(
      <CartItem
        id={item.id}
        title={item.title}
        price={item.price}
        thumbnail={item.thumbnail}
        initialQuantity={item.quantity}
      />,
    );
    expect(
      screen.getByRole("img", { src: item.thumbnail }),
    ).toBeInTheDocument();
    const paragraphs = screen.getAllByRole("paragraph");
    expect(paragraphs[0]).toHaveTextContent(item.title);
    expect(paragraphs[1]).toHaveTextContent(`$${item.price}`);
    expect(screen.getByRole("spinbutton")).toHaveValue(item.quantity);
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  //todo: change quantity, invalid qty error message
});
