import { useState } from "react";
import SelectUnit from "./SelectUnit";

export default function RecepieForm() {
  const [units, setUnits] = useState<number[]>([1, 2, 3]);

  const handleAddUnit = () => {
    setUnits((prevUnits) => [...prevUnits, prevUnits.length + 1]); // Add a new unit
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Recepie name"
        className="input input-bordered input-success w-full max-w-xs m-4"
      />
      <input
        type="text"
        placeholder="Description"
        className="input input-bordered input-success w-full max-w-xs m-4"
      />
      <input
        type="text"
        placeholder="Instructions"
        className="input input-bordered input-success w-full max-w-xs m-4"
      />
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full max-w-xs m-4"
      />
      <input
        type="text"
        placeholder="Cook time"
        className="input input-bordered input-success w-full max-w-xs m-4"
      />

      <div className="container flex flex-col m-4">
        {units.map((index) => (
          <SelectUnit key={index} />
        ))}

        <button
          className="btn btn-success m-4 max-w-xs"
          onClick={handleAddUnit}
        >
          Add Ingredient
        </button>
      </div>
    </div>
  );
}
