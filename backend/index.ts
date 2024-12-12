import cors from "cors";
import * as dotenv from "dotenv";
import { Client } from "pg";
import express from "express";

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI_LOCAL,
});

client.connect();

const app = express();

app.use(express.json());

app.use(cors());

// app.get("/api/menus", async (request, response) => {
//   try {
//     const { rows } = await client.query("SELECT * FROM menus");
//     response.status(200).json(rows);
//   } catch (error) {
//     console.error("Error fetching menus:", error);
//     response.status(500).send("Server error");
//   }
// });

app.get("/api/menus", async (request, response) => {
  try {
    const { rows } = await client.query(
      "SELECT m.menu_name AS Menu_Name, r.recipe_name AS Recipe FROM menu m JOIN menu_recipe mr ON m.id = mr.menu_id JOIN recipe r ON mr.recipe_id = r.id WHERE mr.menu_id = 3"
    );
    response.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching menus:", error);
    response.status(500).send("Server error");
  }
});

app.get("/api/recipes", async (req, res) => {
  try {
    const { rows } = await client.query("SELECT * FROM recipe");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).send("Server error");
  }
});

interface Recipe {
  recipe_name: string;
  description: string;
  instructions: string;
  prep_time: string;
  cook_time: string;
  servings: string;
}

interface Ingredient {
  ingredient_name: string;
  unit: string;
  quantity: string;
}

interface FormInputData {
  recipe: Recipe;
  ingredients: Ingredient[];
}

// POST endpoint to add a recipe

app.post(
  "/api/recipe/new/",
  async (req: express.Request<FormInputData>, res) => {
    const { recipe, ingredients } = req.body;
    try {
      // Begin a database transaction
      await client.query("BEGIN");

      // Insert the recipe into the recipes table
      const recipeInsertQuery = `
      INSERT INTO recipe (recipe_name, description, instructions, prep_time, cook_time, servings)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `;
      const recipeValues = [
        recipe.recipe_name,
        recipe.description,
        recipe.instructions,
        parseInt(recipe.prep_time, 10),
        parseInt(recipe.cook_time, 10),
        parseInt(recipe.servings, 10),
      ];

      const recipeResult = await client.query(recipeInsertQuery, recipeValues);
      const recipeId = recipeResult.rows[0].id;

      // Process each ingredient
      for (const ingredient of ingredients) {
        // Insert ingredient into ingredients table
        const ingredientInsertQuery = `
              INSERT INTO ingredient (ingredient)
              VALUES ($1) RETURNING *
            `;
        const ingredientResult = await client.query(ingredientInsertQuery, [
          ingredient.ingredient_name,
        ]);
        const ingredientId = ingredientResult.rows[0].id;

        // Insert or retrieve the unit
        const unitInsertQuery = `
              INSERT INTO unit (unit_name)
              VALUES ($1) RETURNING *
            `;
        const unitResult = await client.query(unitInsertQuery, [
          ingredient.unit,
        ]);
        const unitId = unitResult.rows[0]?.id;

        // Insert or retrieve the quantity
        const quantityInsertQuery = `
              INSERT INTO quantity (quantity_value)
              VALUES ($1) RETURNING *
            `;
        const quantityResult = await client.query(quantityInsertQuery, [
          ingredient.quantity,
        ]);
        const quantityId = quantityResult.rows[0]?.id;
      }

      await client.query("COMMIT");

      res.status(201).json({ message: "Recipe added successfully", recipeId });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while saving the recipe" });
    }
  }
);

const port = 3000;

app.listen(port, () => {
  console.log("Webbtjänsten kan nu ta emot anrop.");
});
