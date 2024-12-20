import RecepieForm from "../../src/components/RecipeForm";
import RecipeFormProvider from "../../src/providers/FormProvider";

describe("RecipeForm", () => {
  it("passes", () => {
    cy.mount(
      <RecipeFormProvider>
        <RecepieForm />
      </RecipeFormProvider>
    );

    cy.get("input").should("be.visible");
    cy.get("button").should("be.visible");
    cy.get("select").should("be.visible");
    cy.get("option").should("be.visible");
    cy.get("[type='submit']").should("be.visible").click();
  });
});
