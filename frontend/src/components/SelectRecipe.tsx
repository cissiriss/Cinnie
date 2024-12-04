export default function SelectRecipe() {
  return (
    <>
      <h3>Recipes</h3>

      <select className="select select-success w-full max-w-md m-4">
        <option disabled selected>
          Recipe
        </option>
        <option>Chicken</option>
        <option>Tacos</option>
        <option>Pudding</option>
        <option>Pancakes</option>
      </select>
    </>
  );
}
