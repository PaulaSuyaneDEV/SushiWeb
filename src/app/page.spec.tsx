import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "@/app/page";

vi.mock("@/components/ProductList", () => ({
  default: vi.fn(() => <div>Mocked ProductList</div>),
}));

describe("Home", () => {
  it("renderiza o título e o componente ProductList", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /cardápio um sushi/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/mocked productlist/i)).toBeInTheDocument();
  });
});
