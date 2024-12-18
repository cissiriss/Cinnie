import SelectRecipe from "../../src/components/SelectRecipe";
import RecipeFormProvider from "../../src/providers/FormProvider";

describe("SelectRecipe", () => {
  it("should be visible", () => {
    cy.mount(
      <RecipeFormProvider>
        <SelectRecipe />
      </RecipeFormProvider>
    );
    cy.get("p").should("exist");
    cy.get("input").should("be.visible");
    cy.get("input").check();
    cy.get("input").should("be.checked");
  });
});
