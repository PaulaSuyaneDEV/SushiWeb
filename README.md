# 🍣 Um Sushi – Cardápio Digital com Gestão de Dívida Técnica

Projeto final da disciplina **Qualidade de Software**, cujo objetivo é aplicar **práticas ágeis**, **gestão da dívida técnica com o Diagrama IDEA**, **qualidade de código** (Testes AAA, Git Flow, CI/CD) e **documentação baseada na ISO/IEC 12207**.  
O sistema desenvolvido é um **cardápio digital interativo** para o restaurante fictício **"Um Sushi"**.

---

## 📌 Objetivos

- Aplicar o framework **Scrum** com todas as cerimônias documentadas
- Gerenciar a **Dívida Técnica** com uso do **Diagrama IDEA**
- Implementar funcionalidades com **qualidade de código** (Testes, Git Flow, CI/CD)
- Documentar todo o **Ciclo de Vida do Software** com base na **ISO/IEC 12207**
- Praticar **manutenção de software** com a rotação de Squads (semana 2)

---

## 🚀 Tecnologias Utilizadas

### Frontend
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/) (Deploy)

### Backend
- [NestJS](https://nestjs.com/) (API RESTful)
- [Python (Simulação)](https://www.python.org/) — apenas para testes e roteamento de dados mockados

### Testes e Qualidade
- [Jest](https://jestjs.io/) (Testes AAA)
- CI/CD com GitHub Actions

---

## 🧩 Funcionalidades

- Página de **Cardápio Digital** com produtos mockados (imagem, nome, preço, categoria)
- **Carrinho de compras** com adição e remoção de produtos
- Requisições simuladas à API:
  - `GET /menu`
  - `POST /order`
- **Deploy finalizado** com CI/CD ativo

---

## 🗃️ Organização no Notion

> Toda a documentação e acompanhamento do projeto está disponível no Notion, com:

- Cerimônias Scrum (Planning, Daily, Review, Retrospectiva)
- Kanban de tarefas com cores e estimativas
- Diagrama IDEA com mapa de impedimentos e ações
- Documentação do ciclo de vida baseado na ISO/IEC 12207
- Tabela de testes AAA e cobertura
- Modelagem BPMN ou SPEM

🔗 [Clique aqui para acessar o workspace no Notion](#) *(adicione o link quando subir)*

---

## 📸 Exemplos de Interface

| Página do Cardápio | Carrinho de Compras |
|--------------------|---------------------|
| ![](./public/cardapio.png) | ![](./public/carrinho.png) |

---

## 📘 Gestão da Dívida Técnica – IDEA

A dívida técnica foi identificada e categorizada conforme o **modelo IDEA** (Impediments, Decision Factors, Enabling Practices, Actions):

| Tipo de Dívida       | Cor     | Exemplo                            |
|----------------------|---------|-------------------------------------|
| Impedimento          | Laranja | Falta de tempo                      |
| Razão Técnica        | Cinza   | Código mal estruturado              |
---
Obs : foi colocado a 'opção não se aplica' nos outros cards para fins de organização no notion , pois se removesse as etiquetas de um card acabaria removendo de todos

## 🧪 Testes

Todos os testes seguem a estrutura **AAA (Arrange → Act → Assert)**.  
Cobertura mínima de 70% exigida.

```ts
describe('ProductsService', () => {
  it('deve marcar produto como "pendingApproval" se não houver preço', () => {
    // Arrange
    const product = { name: 'Sushi', price: null };

    // Act
    const result = productService.addNewProduct(product);

    // Assert
    expect(result.status).toBe('pendingApproval');
  });
});
