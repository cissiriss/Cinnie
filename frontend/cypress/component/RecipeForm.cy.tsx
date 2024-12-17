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
  });
});
