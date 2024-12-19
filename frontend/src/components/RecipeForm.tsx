import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import { RecipeType } from "../types/types";

export default function RecepieForm() {
  const { register, handleSubmit, reset } = useForm<RecipeType>();

  const { fields, append } = useFieldArray({ name: "ingredients" });

  const handleAddIngredient = () => {
    append({
      name: "",
      unit: "",
      quantity: 0,
    });
  };

  const onSubmit: SubmitHandler<RecipeType> = async (data) => {
    console.log(data);

    await fetch("http://localhost:3000/api/recipe/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!Error) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container flex flex-col items-center w-full">
        <div className="container flex flex-col items-center w-full max-w-lg m-4">
          <input
            {...register("recipe.recipe_name")}
            type="text"
            placeholder="Recepie name"
            className="input input-bordered input-success w-full max-w-lg m-4"
          />
          <textarea
            {...register("recipe.description")}
            className="textarea textarea-bordered w-full max-w-lg m-4"
            placeholder="Description"
          ></textarea>
          <textarea
            {...register("recipe.instructions")}
            className="textarea textarea-bordered w-full max-w-lg m-4"
            placeholder="Instructions"
          ></textarea>
          <input
            {...register("recipe.servings")}
            type="number"
            placeholder="Servings"
            className="input input-bordered input-success w-full max-w-xs  m-4"
          />
          <div className="flex justify-center">
            <input
              {...register("recipe.prep_time")}
              type="number"
              placeholder="Prep time"
              className="input input-bordered input-success w-full max-w-lg m-4"
            />
            <input
              {...register("recipe.cook_time")}
              type="number"
              placeholder="Cook time"
              className="input input-bordered input-success w-full max-w-lg m-4"
            />
          </div>
        </div>

        <div className="container flex flex-col items-center w-full max-w-lg m-4">
          {fields.map((item, index) => (
            <div key={item.id}>
              <h3>Ingredient</h3>
              <input
                {...register(`ingredients.${index}.ingredient_name`)}
                type="text"
                placeholder="Ingredient"
                className="input input-bordered input-success m-4"
              />
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

              <input
                {...register(`ingredients.${index}.quantity`)}
                type="text"
                placeholder="Quantity"
                className="input input-bordered input-success max-w-xs"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddIngredient}
            className="btn btn-neutral m-4 w-full max-w-xs"
          >
            Add Ingredient
          </button>
        </div>
        <button type="submit" className="btn btn-neutral m-12 max-w-xs flex">
          Save
        </button>
      </div>
    </form>
  );
}
