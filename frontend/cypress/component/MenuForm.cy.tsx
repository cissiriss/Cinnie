import MenuForm from "../../src/components/MenuForm";
import RecipeFormProvider from "../../src/providers/FormProvider";

describe("Home", () => {
  it("should render", () => {
    cy.mount(
      <RecipeFormProvider>
        <MenuForm />
      </RecipeFormProvider>
    );
    cy.get("form").should("exist");
    cy.get("input").should("be.visible");
    cy.get("button").should("be.visible");
    cy.get("input").type("test");
    cy.get("input").should("have.value", "test");
  });
});
