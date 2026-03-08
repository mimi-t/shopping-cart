import { render, screen } from "@testing-library/react";
import ProductContainer from "./ProductContainer.jsx";

describe("Product container", () => {
  it("successfully fetch and render products", async () => {
    const products = [
      {
        id: 1,
        title: "Essence Mascara Lash Princess",
        description:
          "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        price: 9.99,
        thumbnail:
          "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
      },
      {
        id: 2,
        title: "Eyeshadow Palette with Mirror",
        description:
          "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
        price: 19.99,
        thumbnail:
          "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
      },
      {
        id: 3,
        title: "Powder Canister",
        description:
          "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
        price: 14.99,
        thumbnail:
          "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
      },
    ];
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ products }),
        }),
      ),
    );

    render(<ProductContainer />);
    expect(await screen.findByTestId("product-container")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(products.length);
  });

  it("display loading message while products are still being fetched", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise(() => {})),
    );
    render(<ProductContainer />);
    expect(screen.getByRole("paragraph")).toHaveTextContent("Loading...");
  });

  it("display error message when product fetch fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("Service is down"))),
    );
    render(<ProductContainer />);
    expect(await screen.findByRole("paragraph")).toHaveTextContent(
      "Service is down",
    );
  });

  it("display error message when product fetch succeeds but response is unsuccessful", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: false, status: 500 })),
    );
    render(<ProductContainer />);
    expect(await screen.findByRole("paragraph")).toHaveTextContent(
      "Response status: 500",
    );
  });
});
