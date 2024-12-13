const formData: RecipeData = {
  recipe: {
    recipe_name: "Test Menu",
    description: "This is a test menu",
    instructions: "Cook the food",
    prep_time: 30,
    cook_time: 45,
    servings: 4,
  },
  ingredients: [
    {
      name: "Tomato",
      unit: "kg",
      quantity: 1,
    },
  ],
};

interface RecipeData {
  recipe: {
    recipe_name: string;
    description: string;
    instructions: string;
    prep_time: number;
    cook_time: number;
    servings: number;
  };
  ingredients: {
    name: string;
    unit: string;
    quantity: number;
  }[];
}

describe("POST-request", () => {
  it("passes", () => {
    cy.request<RecipeData>("POST", "/api/recipe/new", formData).then(
      (response) => {
        const recipe = response.body.recipe;
        expect(response.body.recipe.recipe_name).to.eq(
          formData.recipe.recipe_name
        );
        expect(recipe.description).to.eq(formData.recipe.description);
        expect(recipe.instructions).to.eq(formData.recipe.instructions);
        expect(formData.ingredients).to.be.an("array");
        expect(formData.ingredients[0]).to.eq(formData.ingredients[0]);
      }
    );
  });
});
