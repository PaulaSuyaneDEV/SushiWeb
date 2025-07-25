import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";

vi.mock("@/context/CartContext", () => ({
  useCart: () => ({
    cart: {
      1: 2,
      2: 3,
    },
  }),
}));

describe("Navbar", () => {
  it("renderiza título e link para home", () => {
    render(<Navbar />);

    const homeLink = screen.getByRole("link", { name: /um sushi/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("exibe número total de itens no carrinho", () => {
    render(<Navbar />);

    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
