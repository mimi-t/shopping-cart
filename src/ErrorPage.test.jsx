import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ErrorPage from "./ErrorPage.jsx";

describe("Error page", () => {
  it("renders error page", () => {
    render(<ErrorPage />, { wrapper: MemoryRouter });
    expect(screen.getByRole("heading")).toHaveTextContent(
      "This page doesn't exist.",
    );
    expect(screen.getByRole("paragraph")).toHaveTextContent(
      "Our apologies, we encountered an unexpected error.",
    );
    expect(
      screen.getByRole("link", {
        name: "Go to Home",
      }),
    ).toHaveAttribute("href", "/");
  });
});
