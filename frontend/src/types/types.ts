import { z } from "zod";
import { formSchema } from "./recipeSchema";

export type RecipeType = z.infer<typeof formSchema>;
