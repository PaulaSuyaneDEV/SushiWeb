import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import CarrinhoPage from "@/app/carrinho/page";
import * as CartContextModule from "@/context/CartContext";
import { beforeEach } from "node:test";
import { products } from "@/data/products";

const mockCart = [
  { id: "1", quantity: 2 },
  { id: "2", quantity: 1 },
];

vi.mock("@/context/CartContext", async () => {
  return {
    useCart: vi.fn(),
  };
});

describe("CarrinhoPage", () => {
  beforeEach(() => {
    (CartContextModule.useCart as Mock).mockReturnValue({
      cart: [],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      removeQuantityFromCart: vi.fn(),
    });
  });

  it("renderiza mensagem de carrinho vazio", () => {
    (CartContextModule.useCart as Mock).mockReturnValue({
      cart: [],
      removeFromCart: vi.fn(),
    });

    render(<CarrinhoPage />);

    expect(screen.getByText(/seu carrinho está vazio/i)).toBeInTheDocument();
  });

  it("renderiza itens do carrinho corretamente", () => {
    const removeFromCartMock = vi.fn();
    (CartContextModule.useCart as Mock).mockReturnValue({
      cart: mockCart,
      removeFromCart: removeFromCartMock,
    });

    render(<CarrinhoPage />);

    expect(screen.getByText("🛒 Seu Carrinho")).toBeInTheDocument();
    expect(screen.getByText(/Qtd: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Qtd: 1/i)).toBeInTheDocument();

    const total = (products[0].price * 2 + products[1].price).toFixed(2);
    expect(screen.getByText(`Total: R$ ${total}`)).toBeInTheDocument();

    const removeButtons = screen.getAllByRole("button", { name: /remover/i });
    expect(removeButtons.length).toBe(2);

    fireEvent.click(removeButtons[0]);
    expect(removeFromCartMock).toHaveBeenCalledWith("1");
  });
});
