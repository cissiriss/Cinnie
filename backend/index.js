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
        const { rows } = yield client.query("SELECT m.menu_name AS Menu_Name, r.recipe_name AS Recipe FROM menu m JOIN menu_recipe mr ON m.id = mr.menu_id JOIN recipe r ON mr.recipe_id = r.id WHERE mr.menu_id = 3");
        response.status(200).json(rows);
    }
    catch (error) {
        console.error("Error fetching menus:", error);
        response.status(500).send("Server error");
    }
}));
app.get("/api/shoppinglist/:menuId", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const menuId = request.params;
    try {
        const { rows } = yield client.query("SELECT i.ingredient AS ingredient, q.quantity_value AS quantity, u.unit_name AS unit FROM menu m JOIN menu_recipe mr ON m.id = mr.menu_id JOIN recipe r ON mr.recipe_id = r.id JOIN recipe_ingredient ri ON r.id = ri.recipe_id JOIN ingredient i ON ri.ingredient_id = i.id JOIN quantity q ON ri.quantity_id = q.id JOIN unit u ON ri.unit_id = u.id WHERE mr.id = 1 ORDER BY i.ingredient");
        response.status(200).json(rows);
    }
    catch (error) {
        console.error("Error fetching menus:", error);
        response.status(500).send("Server error");
    }
}));
app.get("/api/recipes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows } = yield client.query("SELECT * FROM recipe");
        res.json(rows);
    }
    catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).send("Server error");
    }
}));
// POST endpoint to add a recipe
app.post("/api/recipe/new/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { recipe, ingredients } = req.body.data;
    try {
        // Begin a database transaction
        yield client.query("BEGIN");
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
        const recipeResult = yield client.query(recipeInsertQuery, recipeValues);
        const recipeId = recipeResult.rows[0].id;
        // Process each ingredient
        for (const ingredient of ingredients) {
            // Insert ingredient into ingredients table
            const ingredientInsertQuery = `
              INSERT INTO ingredient (ingredient)
              VALUES ($1) RETURNING *
            `;
            const ingredientResult = yield client.query(ingredientInsertQuery, [
                ingredient.ingredient_name,
            ]);
            const ingredientId = ingredientResult.rows[0].id;
            // Insert or retrieve the unit
            const unitInsertQuery = `
              INSERT INTO unit (unit_name)
              VALUES ($1) RETURNING *
            `;
            const unitResult = yield client.query(unitInsertQuery, [
                ingredient.unit,
            ]);
            const unitId = (_a = unitResult.rows[0]) === null || _a === void 0 ? void 0 : _a.id;
            // Insert or retrieve the quantity
            const quantityInsertQuery = `
              INSERT INTO quantity (quantity_value)
              VALUES ($1) RETURNING *
            `;
            const quantityResult = yield client.query(quantityInsertQuery, [
                ingredient.quantity,
            ]);
            const quantityId = (_b = quantityResult.rows[0]) === null || _b === void 0 ? void 0 : _b.id;
        }
        yield client.query("COMMIT");
        res.status(201).json({ message: "Recipe added successfully", recipeId });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while saving the recipe" });
    }
}));
const port = 3000;
app.listen(port, () => {
    console.log("Webbtjänsten kan nu ta emot anrop.");
});
