import AllRecipes from "../../src/components/AllRecipes";

describe("AllRecipes", () => {
  it("passes", () => {
    cy.mount(
      <AllRecipes
        recipes={[
          {
            id: 31,
            recipe_name: "Spagetti & köttfärs",
            ingredients: [
              { ingredient_name: "Spagetti", unit: "gram", quantity: 300 },
              { ingredient_name: "Köttfärs", unit: "gram", quantity: 400 },
            ],
            instructions: "Koka spagetti & stek köttfärs",
            description: "Enkelt recept",
            cook_time: 1,
            servings: 1,
          },
        ]}
      />
    );
    cy.get("li").should("be.visible");
    cy.get("li").should("have.length.greaterThan", 0);
    cy.get("h3").should("contain", "Spagetti & köttfärs");
  });
});
