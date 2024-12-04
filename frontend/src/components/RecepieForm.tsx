import SelectUnit from "./SelectUnit";

export default function RecepieForm() {
  return (
    <div>
      <h1>Add recepie</h1>
      <input
        type="text"
        placeholder="Recepie name"
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="text"
        placeholder="Description"
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="text"
        placeholder="Instructions"
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="text"
        placeholder="Cook time"
        className="input input-bordered w-full max-w-xs"
      />
      <h3>Ingredients</h3>
      <input
        type="text"
        placeholder="Ingredient"
        className="input input-bordered w-full max-w-xs"
      />
      <SelectUnit />
    </div>
  );
}
