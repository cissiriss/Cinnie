import { z } from "zod";
import { formSchema, menuSchema } from "./recipeSchema";

export type RecipeType = z.infer<typeof formSchema>;

export type MenuType = z.infer<typeof menuSchema>;
