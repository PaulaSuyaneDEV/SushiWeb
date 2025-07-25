import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { vi } from "vitest";
import ProductList from "./ProductList";

import { describe, it, expect, beforeEach } from "vitest";

vi.mock("./ProductCard", () => ({
  default: ({ product }: { product: { name: string; price: number } }) => (
    <div>
      <p>{product.name}</p>
      <p>{product.price}</p>
    </div>
  ),
}));

describe("ProductList", () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue([
        {
          id: "1",
          name: "Sushi Salmão",
          category: "Sushi",
          image: "/img/sushi.jpg",
          price: 25.9,
        },
        {
          id: "2",
          name: "Temaki Atum",
          category: "Sushi",
          image: "/img/temaki.jpg",
          price: 19.9,
        },
        {
          id: "3",
          name: "Refrigerante Lata",
          category: "Bebida",
          image: "/img/refrigerante.jpg",
          price: 6.0,
        },
      ]),
    });
  });

  it("deve renderizar os botões de filtro corretamente", () => {
    render(<ProductList />);

    expect(screen.getByText("Todos")).toBeInTheDocument();
    expect(screen.getByText("Comidas")).toBeInTheDocument();
    expect(screen.getByText("Bebidas")).toBeInTheDocument();
  });

  it("deve filtrar os produtos corretamente", async () => {
    render(<ProductList />);

    await waitFor(() =>
      expect(screen.getByText("Sushi Salmão")).toBeInTheDocument()
    );

    await act(async () => {
      fireEvent.click(screen.getByText("Comidas"));
    });

    await waitFor(() =>
      expect(screen.queryByText("Refrigerante Lata")).toBeNull()
    );
    expect(screen.getByText("Sushi Salmão")).toBeInTheDocument();
    expect(screen.getByText("Temaki Atum")).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText("Bebidas"));
    });

    await waitFor(() => expect(screen.queryByText("Sushi Salmão")).toBeNull());
    expect(screen.getByText("Refrigerante Lata")).toBeInTheDocument();
  });

  it("deve exibir os produtos após buscar na API", async () => {
    render(<ProductList />);

    await waitFor(() =>
      expect(screen.getByText("Sushi Salmão")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("Temaki Atum")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText("Refrigerante Lata")).toBeInTheDocument()
    );
  });

  it("deve chamar a API corretamente", async () => {
    render(<ProductList />);

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "https://sushiweb-backend.onrender.com/menu"
      )
    );
  });

  it("deve renderizar ProductCard com dados corretos para cada produto", async () => {
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText("Sushi Salmão")).toBeInTheDocument();
      expect(screen.getByText("25.9")).toBeInTheDocument();
      expect(screen.getByText("Temaki Atum")).toBeInTheDocument();
      expect(screen.getByText("19.9")).toBeInTheDocument();
      expect(screen.getByText("Refrigerante Lata")).toBeInTheDocument();
      expect(screen.getByText("6")).toBeInTheDocument();
    });

    expect(screen.getAllByText("Sushi Salmão").length).toBe(1);
    expect(screen.getAllByText("Temaki Atum").length).toBe(1);
    expect(screen.getAllByText("Refrigerante Lata").length).toBe(1);
  });
});
