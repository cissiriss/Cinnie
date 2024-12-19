import AllMenus from "../../src/components/AllMenus";

describe("ShoppingList", () => {
  it("should render h1 and list", () => {
    cy.mount(<AllMenus />);
    cy.get("h1").should("have.text", "Menus");
    cy.get("ul").should("be.visible");
  });
});
