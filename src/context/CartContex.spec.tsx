import { describe, beforeEach, it, expect, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";
import { ErrorBoundary } from "react-error-boundary";

const TestComponent = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    removeQuantityFromCart,
  } = useCart();

  return (
    <>
      <div>
        <button
          onClick={() =>
            addToCart({
              id: "1",
              name: "Produto 1",
              category: "Categoria A",
              image: "image1.jpg",
              price: 10.0,
            })
          }
        >
          Adicionar Produto 1
        </button>
        <button onClick={() => removeFromCart("1")}>Remover Produto 1</button>
        <button onClick={() => updateQuantity("1", 2)}>
          Atualizar Quantidade Produto 1
        </button>
        <button onClick={() => removeQuantityFromCart("1", 1)}>
          Remover Quantidade Produto 1
        </button>
      </div>

      <div>
        <button
          onClick={() =>
            addToCart({
              id: "2",
              name: "Produto 2",
              category: "Categoria B",
              image: "image2.jpg",
              price: 15.0,
            })
          }
        >
          Adicionar Produto 2
        </button>
        <button onClick={() => removeFromCart("2")}>Remover Produto 2</button>
        <button onClick={() => updateQuantity("2", 2)}>
          Atualizar Quantidade Produto 2
        </button>
        <button onClick={() => removeQuantityFromCart("2", 1)}>
          Remover Quantidade Produto 2
        </button>
      </div>
      <div>
        {cart.map((item) => (
          <div key={item.id}>
            <span>
              {item.name} - {item.quantity}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

describe("CartContext", () => {
  beforeEach(() => {
    Storage.prototype.setItem = vi.fn();
    Storage.prototype.getItem = vi.fn(() => JSON.stringify([]));
    Storage.prototype.removeItem = vi.fn();
    localStorage.setItem("cart", "[]");
  });

  it("deve adicionar um produto ao carrinho", async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("Adicionar Produto 1"));

    expect(screen.getByText("Produto 1 - 1")).toBeInTheDocument();

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      expect.any(String)
    );
  });

  it("deve lançar erro ao usar hook sem provider", async () => {
    const handleError = vi.fn();

    render(
      <ErrorBoundary fallback={<div>Erro!</div>} onError={handleError}>
        <TestComponent />
      </ErrorBoundary>
    );

    expect(handleError).toHaveBeenCalled();
  });

  it("deve adicionar um produto ja existente ao carrinho", async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("Adicionar Produto 1"));
    fireEvent.click(screen.getByText("Adicionar Produto 1"));

    expect(screen.getByText("Produto 1 - 2")).toBeInTheDocument();

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      expect.any(String)
    );
  });

  it("deve remover um produto do carrinho", async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("Adicionar Produto 1"));
    fireEvent.click(screen.getByText("Remover Produto 1"));

    expect(screen.queryByText("Produto 1 - 1")).toBeNull();

    expect(localStorage.setItem).toHaveBeenCalledWith("cart", "[]");
  });

  it("deve atualizar a quantidade de um produto", async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("Adicionar Produto 1"));
    fireEvent.click(screen.getByText("Atualizar Quantidade Produto 1"));

    expect(screen.getByText("Produto 1 - 2")).toBeInTheDocument();

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      expect.any(String)
    );
  });

  it("deve remover a quantidade de um produto do carrinho", async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("Adicionar Produto 1"));
    fireEvent.click(screen.getByText("Adicionar Produto 2"));
    fireEvent.click(screen.getByText("Remover Quantidade Produto 1"));

    expect(screen.queryByText("Produto 1 - 0")).toBeNull();

    expect(localStorage.setItem).toHaveBeenCalledWith("cart", "[]");
  });
});
