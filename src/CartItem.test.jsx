import { render, screen } from "@testing-library/react";
import CartItem from "./CartItem";
import { CartContext } from "./Contexts.js";
import userEvent from "@testing-library/user-event";

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

  it("increment and decrement quantity", async () => {
    const user = userEvent.setup();
    const item = {
      id: 1,
      quantity: 1,
      title: "Essence Mascara Lash Princess",
      price: 9.99,
      thumbnail:
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    };

    const mockDeleteFromCart = vi.fn();
    const mockUpdateCartQuantity = vi.fn();

    render(
      <CartContext
        value={{
          deleteFromCart: mockDeleteFromCart,
          updateCartQuantity: mockUpdateCartQuantity,
        }}
      >
        <CartItem
          id={item.id}
          title={item.title}
          price={item.price}
          thumbnail={item.thumbnail}
          initialQuantity={item.quantity}
        />
      </CartContext>,
    );

    const decrementButton = screen.getByRole("button", { name: "-" });
    const incrementButton = screen.getByRole("button", { name: "+" });

    await user.click(incrementButton);
    expect(mockUpdateCartQuantity).toHaveBeenCalledWith(item.id, 2);

    await user.click(decrementButton);
    expect(mockUpdateCartQuantity).toHaveBeenCalledWith(item.id, 1);

    await user.click(decrementButton);
    expect(mockDeleteFromCart).toHaveBeenCalledWith(item.id);
  });

  it("display error message when inputting invalid quantity", async () => {
    const user = userEvent.setup();
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

    await user.type(screen.getByRole("spinbutton"), "100");
    await user.tab();
    expect(
      await screen.findByText(
        "Invalid quantity, please enter a number between 0 to 99.",
      ),
    ).toBeInTheDocument();
  });
});
