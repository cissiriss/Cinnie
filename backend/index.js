"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const pg_1 = require("pg");
const express_1 = __importDefault(require("express"));
dotenv.config();
const client = new pg_1.Client({
    connectionString: process.env.PGURI_LOCAL,
});
client.connect();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/api/menus", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield client.query(`SELECT
    m.id AS menu_id,
    m.menu_name,
    m.start_date,
    m.end_date,
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
    m.id;`);
        response.status(200).json(rows);
    }
    catch (error) {
        console.error("Error fetching menus:", error);
        response.status(500).send("Server error");
    }
}));
app.get("/api/shoppinglist/:menuId", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { menuId } = request.params;
    console.log(menuId);
    try {
        const { rows } = yield client.query("SELECT i.ingredient_name AS ingredient_name, q.quantity_value AS quantity, u.unit_name AS unit FROM menu m JOIN menu_recipe mr ON m.id = mr.menu_id JOIN recipe r ON mr.recipe_id = r.id JOIN recipe_ingredient ri ON r.id = ri.recipe_id JOIN ingredient i ON ri.ingredient_id = i.id JOIN quantity q ON ri.quantity_id = q.id JOIN unit u ON ri.unit_id = u.id WHERE mr.id = $1 ORDER BY i.ingredient_name", [menuId]);
        response.status(200).json(rows);
    }
    catch (error) {
        console.error("Error fetching menus:", error);
        response.status(500).send("Server error");
    }
}));
app.get("/api/recipes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield client.query(`
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
    }
    catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).send("Server error");
    }
}));
app.post("/api/menu/new", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { menu_name, recipes } = req.body;
    try {
        yield client.query("BEGIN");
        const menuInsertQuery = `
      INSERT INTO menu (menu_name)
      VALUES ($1) RETURNING *
    `;
        const menuResult = yield client.query(menuInsertQuery, [menu_name]);
        const menuId = menuResult.rows[0].id;
        const menuRecipeInsertQuery = `
      INSERT INTO menu_recipe (menu_id, recipe_id, date)
      VALUES ($1, $2, now())
      RETURNING *
    `;
        for (const recipeId of recipes) {
            yield client.query(menuRecipeInsertQuery, [menuId, recipeId]);
        }
        yield client.query("COMMIT");
        const result = {
            menu: menuResult.rows[0],
            recipes,
        };
        console.log(result);
        res.status(201).json(result);
    }
    catch (error) {
        yield client.query("ROLLBACK");
        console.error(error);
        res.status(500).json({ error: "An error occurred while saving the menu" });
    }
}));
app.post("/api/recipe/new/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipe, ingredients } = req.body;
    try {
        yield client.query("BEGIN");
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
        const recipeResult = yield client.query(recipeInsertQuery, recipeValues);
        const recipeId = recipeResult.rows[0].id;
        const ingredientsResult = [];
        for (const ingredient of ingredients) {
            const ingredientInsertQuery = `
              INSERT INTO ingredient (ingredient_name)
              VALUES ($1) RETURNING *
            `;
            const ingredientResult = yield client.query(ingredientInsertQuery, [
                ingredient.ingredient_name,
            ]);
            const unitInsertQuery = `
              INSERT INTO unit (unit_name)
              VALUES ($1) RETURNING *
            `;
            const unitResult = yield client.query(unitInsertQuery, [
                ingredient.unit_name,
            ]);
            const quantityInsertQuery = `
              INSERT INTO quantity (quantity_value)
              VALUES ($1) RETURNING *
            `;
            const quantityResult = yield client.query(quantityInsertQuery, [
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
        yield client.query("COMMIT");
        res.status(201);
        res.send(result);
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ error: "An error occurred while saving the recipe" });
    }
}));
const port = 3000;
app.listen(port, () => {
    console.log("Webbtjänsten kan nu ta emot anrop.");
});
