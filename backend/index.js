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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var dotenv = __importStar(require("dotenv"));
var pg_1 = require("pg");
var express_1 = __importDefault(require("express"));
dotenv.config();
var client = new pg_1.Client({
    connectionString: process.env.PGURI_LOCAL,
});
client.connect();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// app.get("/api/menus", async (request, response) => {
//   try {
//     const { rows } = await client.query("SELECT * FROM menus");
//     response.status(200).json(rows);
//   } catch (error) {
//     console.error("Error fetching menus:", error);
//     response.status(500).send("Server error");
//   }
// });
app.get("/api/menus", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query("SELECT m.menu_name AS Menu_Name, r.recipe_name AS Recipe FROM menu m JOIN menu_recipe mr ON m.id = mr.menu_id JOIN recipe r ON mr.recipe_id = r.id WHERE mr.menu_id = 3")];
            case 1:
                rows = (_a.sent()).rows;
                response.status(200).json(rows);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("Error fetching menus:", error_1);
                response.status(500).send("Server error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/api/recipes", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query("SELECT * FROM recipes")];
            case 1:
                rows = (_a.sent()).rows;
                res.json(rows);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error("Error fetching recipes:", error_2);
                res.status(500).send("Server error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// POST endpoint to add a recipe
app.post("/api/recipies/new", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, recipe_name, description, instructions, prep_time, cook_time, servings, ingredients, recipeQuery, recipeValues, recipeResult, recipeId, _i, ingredients_1, ingredient, ingredient_name, quantity_value, unit_name, ingredientQuery, ingredientResult, ingredientId, _b, unitId, unitQuery, unitResult, _c, quantityId, quantityQuery, quantityResult, _d, error_3;
    var _e, _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _h.trys.push([0, 18, , 19]);
                _a = req.body, recipe_name = _a.recipe_name, description = _a.description, instructions = _a.instructions, prep_time = _a.prep_time, cook_time = _a.cook_time, servings = _a.servings, ingredients = _a.ingredients;
                // if (!recipe_name || !ingredients || ingredients.length === 0) {
                //   return res
                //     .status(400)
                //     .json({ error: "Recipe name and ingredients are required." });
                // }
                // Start a transaction
                return [4 /*yield*/, client.query("BEGIN")];
            case 1:
                // if (!recipe_name || !ingredients || ingredients.length === 0) {
                //   return res
                //     .status(400)
                //     .json({ error: "Recipe name and ingredients are required." });
                // }
                // Start a transaction
                _h.sent();
                recipeQuery = "\n      INSERT INTO recipes (recipe_name, description, instructions, prep_time, cook_time, servings)\n      VALUES ($1, $2, $3, $4, $5, $6)\n      RETURNING id;\n    ";
                recipeValues = [
                    recipe_name,
                    description || null,
                    instructions || null,
                    prep_time || null,
                    cook_time || null,
                    servings || null,
                ];
                return [4 /*yield*/, client.query(recipeQuery, recipeValues)];
            case 2:
                recipeResult = _h.sent();
                recipeId = recipeResult.rows[0].id;
                _i = 0, ingredients_1 = ingredients;
                _h.label = 3;
            case 3:
                if (!(_i < ingredients_1.length)) return [3 /*break*/, 17];
                ingredient = ingredients_1[_i];
                ingredient_name = ingredient.ingredient_name, quantity_value = ingredient.quantity_value, unit_name = ingredient.unit_name;
                ingredientQuery = "\n        INSERT INTO ingredients (ingredient)\n        VALUES ($1)\n        ON CONFLICT (ingredient) DO NOTHING\n        RETURNING id;\n      ";
                return [4 /*yield*/, client.query(ingredientQuery, [
                        ingredient_name,
                    ])];
            case 4:
                ingredientResult = _h.sent();
                _b = ((_e = ingredientResult.rows[0]) === null || _e === void 0 ? void 0 : _e.id);
                if (_b) return [3 /*break*/, 6];
                return [4 /*yield*/, client.query("SELECT id FROM ingredients WHERE ingredient = $1", [ingredient_name])];
            case 5:
                _b = (_h.sent()).rows[0].id;
                _h.label = 6;
            case 6:
                ingredientId = _b;
                unitId = null;
                if (!unit_name) return [3 /*break*/, 10];
                unitQuery = "\n          INSERT INTO unit (unit_name)\n          VALUES ($1)\n          ON CONFLICT (unit_name) DO NOTHING\n          RETURNING id;\n        ";
                return [4 /*yield*/, client.query(unitQuery, [unit_name])];
            case 7:
                unitResult = _h.sent();
                _c = ((_f = unitResult.rows[0]) === null || _f === void 0 ? void 0 : _f.id);
                if (_c) return [3 /*break*/, 9];
                return [4 /*yield*/, client.query("SELECT id FROM unit WHERE unit_name = $1", [
                        unit_name,
                    ])];
            case 8:
                _c = (_h.sent()).rows[0].id;
                _h.label = 9;
            case 9:
                unitId = _c;
                _h.label = 10;
            case 10:
                quantityId = null;
                if (!quantity_value) return [3 /*break*/, 14];
                quantityQuery = "\n          INSERT INTO quantity (quantity_value)\n          VALUES ($1)\n          ON CONFLICT (quantity_value) DO NOTHING\n          RETURNING id;\n        ";
                return [4 /*yield*/, client.query(quantityQuery, [
                        quantity_value,
                    ])];
            case 11:
                quantityResult = _h.sent();
                _d = ((_g = quantityResult.rows[0]) === null || _g === void 0 ? void 0 : _g.id);
                if (_d) return [3 /*break*/, 13];
                return [4 /*yield*/, client.query("SELECT id FROM quantity WHERE quantity_value = $1", [quantity_value])];
            case 12:
                _d = (_h.sent()).rows[0].id;
                _h.label = 13;
            case 13:
                quantityId = _d;
                _h.label = 14;
            case 14: 
            // Commit the transaction
            return [4 /*yield*/, client.query("COMMIT")];
            case 15:
                // Commit the transaction
                _h.sent();
                res.status(201).json({ message: "Recipe added successfully", recipeId: recipeId });
                _h.label = 16;
            case 16:
                _i++;
                return [3 /*break*/, 3];
            case 17: return [3 /*break*/, 19];
            case 18:
                error_3 = _h.sent();
                console.error("Error adding recipe:", error_3);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 19];
            case 19: return [2 /*return*/];
        }
    });
}); });
var port = 3000;
app.listen(port, function () {
    console.log("Webbtjänsten kan nu ta emot anrop.");
});
//# sourceMappingURL=index.js.map