import { useState } from "react";
import SelectUnit from "./SelectUnit";

export default function RecepieForm() {
  const [units, setUnits] = useState<number[]>([1, 2, 3]);

  const handleAddUnit = () => {
    setUnits((prevUnits) => [...prevUnits, prevUnits.length + 1]); // Add a new unit
  };

  return (
    <div className="container flex flex-col items-center w-full">
      <div className="container flex flex-col items-center w-full max-w-md m-4">
        <input
          type="text"
          placeholder="Recepie name"
          className="input input-bordered input-success w-full max-w-md m-4"
        />
        <textarea
          className="textarea textarea-bordered w-full max-w-md m-4"
          placeholder="Description"
        ></textarea>
        <textarea
          className="textarea textarea-bordered w-full max-w-md m-4"
          placeholder="Instructions"
        ></textarea>
        <input
          type="text"
          placeholder="Cook time"
          className="input input-bordered input-success w-full max-w-md m-4"
        />
      </div>

      <div className="container flex flex-col items-center w-full max-w-md m-4">
        {units.map((index) => (
          <SelectUnit key={index} />
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
