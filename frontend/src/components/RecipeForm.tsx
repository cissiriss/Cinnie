import { useState } from "react";

import Ingredients from "./Ingredients";

export default function RecepieForm() {
  const [ingredients, setIngredients] = useState<number[]>([1, 2, 3]);

  const handleAddUnit = () => {
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      prevIngredients.length + 1,
    ]); // Add a new unit
  };

  return (
    <div className="container flex flex-col items-center w-full">
      <div className="container flex flex-col items-center w-full max-w-lg m-4">
        <input
          type="text"
          placeholder="Recepie name"
          className="input input-bordered input-success w-full max-w-lg m-4"
        />
        <textarea
          className="textarea textarea-bordered w-full max-w-lg m-4"
          placeholder="Description"
        ></textarea>
        <textarea
          className="textarea textarea-bordered w-full max-w-lg m-4"
          placeholder="Instructions"
        ></textarea>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Prep time"
            className="input input-bordered input-success w-full max-w-lg m-4"
          />
          <input
            type="text"
            placeholder="Cook time"
            className="input input-bordered input-success w-full max-w-lg m-4"
          />
        </div>
      </div>

      <div className="container flex flex-col items-center w-full max-w-lg m-4">
        {ingredients.map((index) => (
          <Ingredients key={index} />
        ))}

        <button
          className="btn btn-neutral m-4 w-full max-w-xs"
          onClick={handleAddUnit}
        >
          Add Ingredient
        </button>
      </div>
    </div>
  );
}
