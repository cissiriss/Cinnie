import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../types/recipeSchema";
import { RecipeType } from "../types/types";
interface OSAFormProps {
  children: React.ReactNode;
}

export default function RecipeFormProvider({ children }: OSAFormProps) {
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
    },
    resolver: zodResolver(formSchema),
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
}
