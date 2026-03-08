import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "./App.jsx";

describe("Home page", () => {
  it("renders home page", () => {
    const container = render(<App />, { wrapper: MemoryRouter });
    expect(container).toMatchSnapshot();
  });

  it("button opens Shop page", async () => {
    render(<App />, { wrapper: MemoryRouter });
    const button = screen.getByRole("link", {
      name: "Discover our collection",
    });
    expect(button).toHaveAttribute("href", "/shop");
  });
});
