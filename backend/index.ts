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

const port = 3000;

app.listen(port, () => {
  console.log("Webbtjänsten kan nu ta emot anrop.");
});
