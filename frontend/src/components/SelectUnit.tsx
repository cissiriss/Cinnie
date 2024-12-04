export default function SelectUnit() {
  return (
    <>
      <h3>Ingredients</h3>
      <input
        type="text"
        placeholder="Ingredient"
        className="input input-bordered input-success w-full max-w-xs m-4"
      />
      <select className="select select-success w-full max-w-xs m-4">
        <option disabled selected>
          Unit
        </option>
        <option>st</option>
        <option>gram</option>
        <option>ml</option>
        <option>cl</option>
        <option>dl</option>
      </select>
    </>
  );
}
