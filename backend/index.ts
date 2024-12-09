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
    const { rows } = await client.query("SELECT * FROM recipes");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).send("Server error");
  }
});

// POST endpoint to add a recipe
app.post("/api/recipies/new", async (req, res) => {
  try {
    const {
      recipe_name,
      description,
      instructions,
      prep_time,
      cook_time,
      servings,
      ingredients,
    } = req.body;

    // if (!recipe_name || !ingredients || ingredients.length === 0) {
    //   return res
    //     .status(400)
    //     .json({ error: "Recipe name and ingredients are required." });
    // }

    // Start a transaction
    await client.query("BEGIN");

    // Insert recipe
    const recipeQuery = `
      INSERT INTO recipes (recipe_name, description, instructions, prep_time, cook_time, servings)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;
    const recipeValues = [
      recipe_name,
      description || null,
      instructions || null,
      prep_time || null,
      cook_time || null,
      servings || null,
    ];
    const recipeResult = await client.query(recipeQuery, recipeValues);
    const recipeId = recipeResult.rows[0].id;

    // Insert ingredients, units, and quantities
    for (const ingredient of ingredients) {
      const { ingredient_name, quantity_value, unit_name } = ingredient;

      // Insert ingredient
      const ingredientQuery = `
        INSERT INTO ingredients (ingredient)
        VALUES ($1)
        ON CONFLICT (ingredient) DO NOTHING
        RETURNING id;
      `;
      const ingredientResult = await client.query(ingredientQuery, [
        ingredient_name,
      ]);
      const ingredientId =
        ingredientResult.rows[0]?.id || // Use the returned ID if inserted
        (
          await client.query(
            "SELECT id FROM ingredients WHERE ingredient = $1",
            [ingredient_name]
          )
        ).rows[0].id; // Fetch ID if the ingredient already exists

      // Insert unit (if applicable)
      let unitId = null;
      if (unit_name) {
        const unitQuery = `
          INSERT INTO unit (unit_name)
          VALUES ($1)
          ON CONFLICT (unit_name) DO NOTHING
          RETURNING id;
        `;
        const unitResult = await client.query(unitQuery, [unit_name]);
        unitId =
          unitResult.rows[0]?.id ||
          (
            await client.query("SELECT id FROM unit WHERE unit_name = $1", [
              unit_name,
            ])
          ).rows[0].id;
      }

      // Insert quantity (if applicable)
      let quantityId = null;
      if (quantity_value) {
        const quantityQuery = `
          INSERT INTO quantity (quantity_value)
          VALUES ($1)
          ON CONFLICT (quantity_value) DO NOTHING
          RETURNING id;
        `;
        const quantityResult = await client.query(quantityQuery, [
          quantity_value,
        ]);
        quantityId =
          quantityResult.rows[0]?.id ||
          (
            await client.query(
              "SELECT id FROM quantity WHERE quantity_value = $1",
              [quantity_value]
            )
          ).rows[0].id;
      }

      // Commit the transaction
      await client.query("COMMIT");

      res.status(201).json({ message: "Recipe added successfully", recipeId });
    }
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = 3000;

app.listen(port, () => {
  console.log("Webbtjänsten kan nu ta emot anrop.");
});
