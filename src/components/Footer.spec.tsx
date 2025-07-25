import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("exibe o ano atual", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} Um Sushi. Todos os direitos reservados.`)
    ).toBeInTheDocument();
  });

  it("tem link para Política de Privacidade", () => {
    render(<Footer />);
    expect(screen.getByText(/política de privacidade/i)).toBeInTheDocument();
  });

  it("tem link para Contato", () => {
    render(<Footer />);
    expect(screen.getByText(/contato/i)).toBeInTheDocument();
  });
});
