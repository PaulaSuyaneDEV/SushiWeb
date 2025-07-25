import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, Mock } from "vitest";
import ProductCard from "./ProductCard";
import { useCart } from "@/context/CartContext";

import { describe, it, expect, beforeEach } from "vitest";

vi.mock("@/context/CartContext", () => ({
  ...vi.importActual("@/context/CartContext"),
  useCart: vi.fn(),
}));

describe("ProductCard", () => {
  const product = {
    id: "1",
    name: "Sushi Salmão",
    category: "Sushi",
    image: "/img/sushi.jpg",
    price: 25.9,
  };

  beforeEach(() => {
    (useCart as Mock).mockReturnValue({
      cart: [],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      removeQuantityFromCart: vi.fn(),
    });
  });

  it("deve renderizar os dados do produto corretamente", () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText("Sushi Salmão")).toBeInTheDocument();
    expect(screen.getByText("Sushi")).toBeInTheDocument();
    expect(screen.getByText("R$ 25.90")).toBeInTheDocument();
  });

  it('deve chamar addToCart quando o botão "Adicionar ao Carrinho" for clicado', () => {
    const addToCart = vi.fn();

    (useCart as Mock).mockReturnValue({
      cart: [],
      addToCart,
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      removeQuantityFromCart: vi.fn(),
    });

    render(<ProductCard product={product} />);

    const addButton = screen.getByText("Adicionar ao Carrinho");
    fireEvent.click(addButton);

    expect(addToCart).toHaveBeenCalledWith(product);
  });

  it('deve chamar removeQuantityFromCart quando o botão "Remover" for clicado', () => {
    const removeQuantityFromCart = vi.fn();

    (useCart as Mock).mockReturnValue({
      cart: [{ ...product, quantity: 2 }],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      removeQuantityFromCart,
    });

    render(<ProductCard product={product} />);

    const removeButton = screen.getByText("Remover");
    fireEvent.click(removeButton);

    expect(removeQuantityFromCart).toHaveBeenCalledWith(product.id, 2);
  });

  it("deve atualizar o valor de inputValue quando o usuário digitar na quantidade", () => {
    render(<ProductCard product={product} />);

    const addButton = screen.getByText("Adicionar ao Carrinho");
    fireEvent.click(addButton);
    waitFor(() => {
      const input = screen.getByTestId("qty-1");
      fireEvent.change(input, { target: { value: "3" } });

      expect(input).toHaveValue(3);
    });
  });
});
