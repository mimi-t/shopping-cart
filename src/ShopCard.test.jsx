import { render, screen } from "@testing-library/react";
import ShopCard from "./ShopCard";
import userEvent from "@testing-library/user-event";

describe("Product card", () => {
  it("render product card", () => {
    const product = {
      id: 1,
      title: "Essence Mascara Lash Princess",
      description:
        "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
      price: 9.99,
      thumbnail:
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    };

    render(
      <ShopCard
        key={product.id}
        title={product.title}
        description={product.description}
        price={product.price}
        image={product.thumbnail}
      />,
    );

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText("$" + product.price)).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toHaveValue(0);
    expect(
      screen.getByRole("img", { src: product.thumbnail }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add to cart" }),
    ).toBeInTheDocument();
  });

  it("increment and decrement quantity", async () => {
    const user = userEvent.setup();
    const product = {
      id: 1,
      title: "Essence Mascara Lash Princess",
      description:
        "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
      price: 9.99,
      thumbnail:
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    };

    render(
      <ShopCard
        key={product.id}
        title={product.title}
        description={product.description}
        price={product.price}
        image={product.thumbnail}
      />,
    );

    const quantityInput = screen.getByRole("spinbutton");
    const decrementButton = screen.getByRole("button", { name: "-" });
    const incrementButton = screen.getByRole("button", { name: "+" });

    await user.click(decrementButton);
    expect(quantityInput).toHaveValue(0);
    await user.click(incrementButton);
    expect(quantityInput).toHaveValue(1);
    await user.click(decrementButton);
    expect(quantityInput).toHaveValue(0);
  });

  it("adding item to cart resets quantity", async () => {
    const user = userEvent.setup();
    const product = {
      id: 1,
      title: "Essence Mascara Lash Princess",
      description:
        "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
      price: 9.99,
      thumbnail:
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    };

    render(
      <ShopCard
        key={product.id}
        title={product.title}
        description={product.description}
        price={product.price}
        image={product.thumbnail}
      />,
    );

    const quantityInput = screen.getByRole("spinbutton");
    await user.type(quantityInput, "2");
    expect(quantityInput).toHaveValue(2);
    const addToCartButton = screen.getByRole("button", { name: "Add to cart" });
    await user.click(addToCartButton);
    expect(quantityInput).toHaveValue(0);
  });
});
