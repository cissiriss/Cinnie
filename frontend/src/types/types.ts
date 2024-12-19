import { z } from "zod";
import { formSchema, menuSchema } from "./recipeSchema";

export type RecipeType = z.infer<typeof formSchema>;

export type MenuType = z.infer<typeof menuSchema>;

export interface Ingredient {
  ingredient_name: string;
  unit_name: string;
  quantity_value: number;
}

export interface Recipe {
  id: number;
  recipe_name: string;
  description: string;
  instructions: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  ingredients: Ingredient[];
}
