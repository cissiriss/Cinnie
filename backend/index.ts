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
  unit_name: string;
  quantity_name: string;
}

interface RecipeInputData {
  recipe: Recipe;
  ingredients: Ingredient[];
}

interface MenuInputData {
  menu_name: string;
  recipes: string[];
}

app.get("/api/menus", async (request, response) => {
  try {
    const { rows } = await client.query(
      `SELECT
    m.id AS menu_id,
    m.menu_name,
    COALESCE(
        json_agg(
            json_build_object(
                'recipe_id', r.id,
                'recipe_name', r.recipe_name
            )
        ) FILTER (WHERE r.id IS NOT NULL),
        '[]'
    ) AS recipes
FROM
    menu m
LEFT JOIN
    menu_recipe mr ON m.id = mr.menu_id
LEFT JOIN
    recipe r ON mr.recipe_id = r.id
GROUP BY
    m.id
ORDER BY
    m.id;`
    );
    response.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching menus:", error);
    response.status(500).send("Server error");
  }
});

app.get("/api/shoppinglist/:menuId", async (request, response) => {
  const { menuId } = request.params;
  try {
    const { rows } = await client.query(
      `SELECT
        r.id AS recipe_id,
        r.recipe_name AS recipe_name,
        json_agg(
          json_build_object(
            'ingredient_name', i.ingredient_name,
            'quantity', q.quantity_value,
            'unit', u.unit_name
          )
        ) AS ingredients
      FROM menu m
      JOIN menu_recipe mr ON m.id = mr.menu_id
      JOIN recipe r ON mr.recipe_id = r.id
      JOIN recipe_ingredient ri ON r.id = ri.recipe_id
      JOIN ingredient i ON ri.ingredient_id = i.id
      JOIN quantity q ON ri.quantity_id = q.id
      JOIN unit u ON ri.unit_id = u.id
      WHERE m.id = $1
      GROUP BY r.id, r.recipe_name
      ORDER BY r.recipe_name`,
      [menuId]
    );
    response.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching menus:", error);
    response.status(500).send("Server error");
  }
});

app.get("/api/recipes", async (req: express.Request<Recipe>, res) => {
  try {
    const { rows } = await client.query(`
SELECT
    r.recipe_name,
    r.instructions,
    r.cook_time,
    r.servings,
    ARRAY_AGG(
        JSONB_BUILD_OBJECT(
            'ingredient_name', i.ingredient_name,
            'unit_name', u.unit_name,
            'quantity_value', q.quantity_value
        )
    ) AS ingredients
FROM
    recipe r
LEFT JOIN
    recipe_ingredient ri ON r.id = ri.recipe_id
LEFT JOIN
    ingredient i ON ri.ingredient_id = i.id
LEFT JOIN
    quantity q ON ri.quantity_id = q.id
LEFT JOIN
    unit u ON ri.unit_id = u.id
GROUP BY
    r.id;
`);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).send("Server error");
  }
});

app.post("/api/menu/new", async (req: express.Request<MenuInputData>, res) => {
  const { menu_name, recipes } = req.body;

  try {
    await client.query("BEGIN");

    const menuInsertQuery = `
      INSERT INTO menu (menu_name)
      VALUES ($1) RETURNING *
    `;
    const menuResult = await client.query(menuInsertQuery, [menu_name]);

    const menuId = menuResult.rows[0].id;

    const menuRecipeInsertQuery = `
      INSERT INTO menu_recipe (menu_id, recipe_id, date)
      VALUES ($1, $2, now())
      RETURNING *
    `;

    for (const recipeId of recipes) {
      await client.query(menuRecipeInsertQuery, [menuId, recipeId]);
    }

    await client.query("COMMIT");

    const result = {
      menu: menuResult.rows[0],
      recipes,
    };

    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ error: "An error occurred while saving the menu" });
  }
});

app.post(
  "/api/recipe/new/",
  async (req: express.Request<RecipeInputData>, res) => {
    const { recipe, ingredients } = req.body;
    try {
      await client.query("BEGIN");

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

      const ingredientsResult: Ingredient[] = [];

      for (const ingredient of ingredients) {
        const ingredientInsertQuery = `
              INSERT INTO ingredient (ingredient_name)
              VALUES ($1) RETURNING *
            `;

        const ingredientResult = await client.query(ingredientInsertQuery, [
          ingredient.ingredient_name,
        ]);

        const unitInsertQuery = `
              INSERT INTO unit (unit_name)
              VALUES ($1) RETURNING *
            `;

        const unitResult = await client.query(unitInsertQuery, [
          ingredient.unit_name,
        ]);

        const quantityInsertQuery = `
              INSERT INTO quantity (quantity_value)
              VALUES ($1) RETURNING *
            `;
        const quantityResult = await client.query(quantityInsertQuery, [
          ingredient.quantity_name,
        ]);

        ingredientsResult.push({
          ingredient_name: ingredientResult.rows[0],
          unit_name: unitResult.rows[0],
          quantity_name: quantityResult.rows[0],
        });
      }

      const result = {
        recipe: recipeResult.rows[0],
        ingredients: ingredientsResult,
      };

      await client.query("COMMIT");

      res.status(201);

      res.send(result);
    } catch (error) {
      console.log(error);
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
