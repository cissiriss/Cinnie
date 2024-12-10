import Quantity from "./Quantity";
import SelectUnit from "./SelectUnit";

export default function Ingredients() {
  return (
    <div>
      <h3>Ingredient</h3>
      <input
        type="text"
        placeholder="Ingredient"
        className="input input-bordered input-success m-4"
      />

      <Quantity />
      <SelectUnit />
    </div>
  );
}
