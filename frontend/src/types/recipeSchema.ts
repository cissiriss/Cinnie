import { z } from "zod";

export const recipeSchema = z.object({
  recipe_name: z
    .string()
    .min(1, { message: "Du behöver fylla i ett namn på receptet" }),
  description: z
    .string()
    .min(1, { message: "Du behöver fylla i en beskrivning" }),
  instructions: z
    .string()
    .min(1, { message: "Du behöver fylla i instruktioner" }),
  prep_time: z.string(),
  cook_time: z.string(),
  servings: z.string(),
});

export const ingredientSchema = z.array(
  z.object({
    ingredient_name: z
      .string()
      .min(1, { message: "Du behöver fylla i ett ingrediensnamn" }),
    unit: z.string(),
    quantity: z.string(),
  })
);

export const formSchema = z.object({
  recipe: recipeSchema,
  ingredients: ingredientSchema,
});
