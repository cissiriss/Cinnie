import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../types/recipeSchema";
import { RecipeType } from "../types/types";
interface RecipeProps {
  children: React.ReactNode;
}

export default function RecipeFormProvider({ children }: RecipeProps) {
  const methods = useForm<RecipeType>({
    defaultValues: {
      recipe: {
        recipe_name: "",
        description: "",
        instructions: "",
        prep_time: "",
        cook_time: "",
        servings: "",
      },
      ingredients: [
        {
          ingredient_name: "",
          unit: "",
          quantity: "",
        },
      ],
      menu: {
        menu_name: "",
        recipes: [],
      },
    },
    resolver: zodResolver(formSchema),
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
