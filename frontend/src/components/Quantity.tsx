import { useFormContext } from "react-hook-form";
import { RecipeType } from "../types/types";

export default function Quantity({ index }: { index: number }) {
  const { register } = useFormContext<RecipeType>();
  return (
    <>
      <input
        {...register(`ingredients.${index}.quantity`)}
        type="text"
        placeholder="Quantity"
        className="input input-bordered input-success max-w-xs"
      />
    </>
  );
}
