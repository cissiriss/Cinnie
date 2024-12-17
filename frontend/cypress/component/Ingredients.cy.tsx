import Ingredients from "../../src/components/Ingredients";
import RecipeFormProvider from "../../src/providers/FormProvider";

describe("Ingredients", () => {
  it("passes", () => {
    cy.mount(
      <RecipeFormProvider>
        <Ingredients index={0} />
      </RecipeFormProvider>
    );
    cy.get("input").should("be.visible");
    cy.get("input").type("test");
    cy.get("input").should("have.value", "test");
  });
});
