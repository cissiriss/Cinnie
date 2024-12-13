import { z } from "zod";
import { formSchema } from "./recipeSchema";

export type RecipeType = z.infer<typeof formSchema>;

export interface RecipeData {
  recipe: {
    id: number;
    recipe_name: string;
    description: string;
    instructions: string;
    prep_time: number;
    cook_time: number;
    servings: number;
  };
  ingredients: {
    name: string;
    unit: string;
    quantity: number;
  }[];
}
