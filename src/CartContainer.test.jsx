import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CartContainer from "./CartContainer.jsx";
import { CartContext } from "./Contexts.js";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import PropTypes from "prop-types";

const TestWrapper = ({ children, initialProducts }) => {
  const [products, setProducts] = useState(initialProducts);

  const deleteFromCart = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <CartContext value={{ products, deleteFromCart }}>{children}</CartContext>
  );
};

TestWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  initialProducts: PropTypes.arrayOf(PropTypes.object),
};

describe("Cart container", () => {
  it("render cart container with empty cart", () => {
    render(
      <CartContext value={{ products: [] }}>
        <CartContainer />
      </CartContext>,
      { wrapper: MemoryRouter },
    );

    expect(screen.getByRole("paragraph")).toHaveTextContent(
      "Your cart is empty.",
    );
  });

  it("render cart container with populated cart", async () => {
    const productArr = [
      {
        id: 1,
        quantity: 1,
        title: "Essence Mascara Lash Princess",
        price: 9.99,
        thumbnail:
          "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
      },
      {
        id: 2,
        quantity: 3,
        title: "Eyeshadow Palette with Mirror",
        category: "beauty",
        price: 19.99,
        thumbnail:
          "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
      },
    ];

    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValueOnce(
          new Response(JSON.stringify(productArr[0]), { status: 200 }),
        )
        .mockResolvedValueOnce(
          new Response(JSON.stringify(productArr[1]), { status: 200 }),
        ),
    );

    render(
      <TestWrapper
        initialProducts={[
          { id: 1, quantity: 1 },
          { id: 2, quantity: 3 },
        ]}
      >
        <CartContainer />
      </TestWrapper>,
      { wrapper: MemoryRouter },
    );

    expect(
      await screen.findByRole("img", { name: "Essence Mascara Lash Princess" }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("img", { name: "Eyeshadow Palette with Mirror" }),
    ).toBeInTheDocument();
    expect(await screen.findByText("Total")).toBeInTheDocument();
    expect(await screen.findByText("$69.96")).toBeInTheDocument();
  });

  it("display loading message while products are still being fetched", async () => {
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(new Promise(() => {})));

    render(
      <TestWrapper initialProducts={[{ id: 1, quantity: 1 }]}>
        <CartContainer />
      </TestWrapper>,
      { wrapper: MemoryRouter },
    );

    expect(await screen.findByRole("paragraph")).toHaveTextContent(
      "Loading...",
    );
  });

  it("display error message when product fetch succeeds but response is unsuccessful", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 500 })),
    );
    render(
      <TestWrapper initialProducts={[{ id: 1, quantity: 1 }]}>
        <CartContainer />
      </TestWrapper>,
    );
    expect(await screen.findByRole("paragraph")).toHaveTextContent(
      "Can't retrieve products, encountered error: Response status: 500",
    );
  });

  it("remove item from CartContainer when Delete button is clicked and deletion is confirmed", async () => {
    const productArr = [
      {
        id: 1,
        quantity: 1,
        title: "Essence Mascara Lash Princess",
        price: 9.99,
        thumbnail:
          "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
      },
      {
        id: 2,
        quantity: 3,
        title: "Eyeshadow Palette with Mirror",
        category: "beauty",
        price: 19.99,
        thumbnail:
          "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
      },
    ];

    // mock fetch, the first two values are for the intially loaded products, the third is after one of the products is deleted
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValueOnce(
          new Response(JSON.stringify(productArr[0]), { status: 200 }),
        )
        .mockResolvedValueOnce(
          new Response(JSON.stringify(productArr[1]), { status: 200 }),
        )
        .mockResolvedValueOnce(
          new Response(JSON.stringify(productArr[1]), { status: 200 }),
        ),
    );

    render(
      <TestWrapper
        initialProducts={[
          { id: 1, quantity: 1 },
          { id: 2, quantity: 3 },
        ]}
      >
        <CartContainer />
      </TestWrapper>,
      { wrapper: MemoryRouter },
    );

    const user = userEvent.setup();
    const deleteButton = await screen.findAllByRole("img", {
      name: "Delete",
    });
    await user.click(deleteButton[0]);
    expect(
      await screen.findByText(
        `Are you sure you want to remove ${productArr[0].title} from your cart?`,
      ),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Confirm" }));

    expect(
      await screen.findByText("Eyeshadow Palette with Mirror"),
    ).toBeInTheDocument();
    expect(screen.queryByText("Essence Mascara Lash Princess")).toBeNull();
  });
});
