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
      "SELECT mp.name AS meal_plan_name, r.name AS recipe_name FROM meal_plan_recipes mpr JOIN recipes r ON mpr.recipe_id = r.id JOIN meal_plans mp ON mpr.meal_plan_id = mp.id WHERE mpr.meal_plan_id = 1"
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

const port = 3000;

app.listen(port, () => {
  console.log("Webbtjänsten kan nu ta emot anrop.");
});
