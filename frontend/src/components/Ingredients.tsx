import { useFormContext } from "react-hook-form";
import { RecipeType } from "../types/types";

export default function Ingredients({ index }: { index: number }) {
  const { register } = useFormContext<RecipeType>();
  return (
    <div>
      <h3>Ingredient</h3>
      <input
        {...register(`ingredients.${index}.ingredient_name`)}
        type="text"
        placeholder="Ingredient"
        className="input input-bordered input-success m-4"
      />
    </div>
  );
}
