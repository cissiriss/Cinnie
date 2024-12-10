import { useFormContext } from "react-hook-form";
import { RecipeType } from "../types/types";

export default function SelectUnit({ index }: { index: number }) {
  const { register } = useFormContext<RecipeType>();
  return (
    <>
      <select
        {...register(`ingredients.${index}.unit`)}
        className="select select-success m-4"
      >
        <option disabled selected>
          Unit
        </option>
        <option>st</option>
        <option>gram</option>
        <option>ml</option>
        <option>cl</option>
        <option>dl</option>
        <option>tsp</option>
        <option>tbsp</option>
      </select>
    </>
  );
}
