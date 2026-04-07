import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home from "./Home.jsx";

describe("Home page", () => {
  it("renders home page", () => {
    render(<Home />, { wrapper: MemoryRouter });

    const heroImage = screen.getByRole("img", {
      alt: "Perfume bottle balanced on wood",
    });
    expect(heroImage).toBeInTheDocument();

    expect(screen.getByRole("heading")).toHaveTextContent("Fables");
    expect(screen.getByRole("paragraph")).toHaveTextContent(
      "Explore our range of science-backed formulas engineered to nourish your skin.",
    );

    const button = screen.getByRole("link", {
      name: "Discover our collection",
    });
    expect(button).toHaveAttribute("href", "/shop");
  });
});
