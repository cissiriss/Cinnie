import RecipeFormProvider from "../../src/providers/FormProvider";
import Quantity from "../../src/components/Quantity";

describe("Quantity", () => {
  it("mounts", () => {
    cy.mount(
      <RecipeFormProvider>
        <Quantity index={0} />
      </RecipeFormProvider>
    );
    cy.get("input").should("be.visible");
    cy.get("input").type("test");
    cy.get("input").should("have.value", "test");
  });
});
