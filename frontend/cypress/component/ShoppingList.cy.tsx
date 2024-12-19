import ShoppingList from "../../src/components/ShoppingList";

describe("ShoppingList", () => {
  it("should render", () => {
    cy.mount(<ShoppingList menuId={1} />);
    cy.get("h2").should("have.text", "Shopping List");
    cy.get("ul").should("be.visible");
    cy.get("li").should("contain", "Butter");
  });
});
