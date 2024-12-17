import SelectUnit from "../../src/components/SelectUnit";
import RecipeFormProvider from "../../src/providers/FormProvider";

describe("", () => {
  it("passes", () => {
    cy.mount(
      <RecipeFormProvider>
        <SelectUnit index={0} />
      </RecipeFormProvider>
    );
    cy.get("select").should("be.visible");
    cy.get("option").should("have.length", 8);
    cy.get("option").should("contain", "Unit");
    cy.get("option").then((options) => {
      expect(options[1]).to.contain("st");
      expect(options[2]).to.contain("gram");
      expect(options[3]).to.contain("ml");
      expect(options[4]).to.contain("cl");
      expect(options[5]).to.contain("dl");
      expect(options[6]).to.contain("tsp");
      expect(options[7]).to.contain("tbsp");
    });
    cy.get("select").select("gram");
    cy.get("select").should("have.value", "gram");
  });
});
