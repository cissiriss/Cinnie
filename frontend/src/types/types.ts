import { z } from "zod";
import { formSchema, menuSchema } from "./recipeSchema";

export type RecipeType = z.infer<typeof formSchema>;

export type MenuType = z.infer<typeof menuSchema>;

export interface PostMenu {
  menu_name: string;
  recipe_ids: number[];
}

export interface Menu {
  recipe_id: number;
  recipe_name: string;
  ingredients: Ingredient[];
}
export interface Ingredient {
  ingredient_name: string;
  unit: string;
  quantity: number;
}

export interface Recipe {
  id: number;
  recipe_name: string;
  description: string;
  instructions: string;
  cook_time: number;
  servings: number;
  ingredients: Ingredient[];
}
