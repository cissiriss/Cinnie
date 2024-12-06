describe("POST-request", () => {
  const formData = {
    name: "Test Menu",
    description: "This is a test menu",
    instructions: "Cook the food",
    prep_time: 30,
    cook_time: 45,
    servings: 4,
    ingredients: [
      {
        name: "Tomato",
        unit: "kg",
        quantity: 1,
      },
      {
        name: "Potato",
        unit: "kg",
        quantity: 2,
      },
    ],
  };

  it("passes", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/api/recipes",
      body: formData,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.be.an("object");
      const recipe = response.body[0];
      expect(recipe.name).to.eq(formData.name);
      expect(recipe.description).to.eq(formData.description);
      expect(recipe.instructions).to.eq(formData.instructions);
      expect(recipe.ingredients).to.be.an("array");
      expect(recipe.ingredients[0]).to.eq(formData.ingredients[0]);
      expect(recipe.ingredients[1]).to.eq(formData.ingredients[1]);
    });
  });
});
