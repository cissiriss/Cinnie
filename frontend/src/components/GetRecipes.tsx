import { useEffect } from "react";

export default function GetRecipes() {
  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("http://localhost:3000/api/recipes/");

      const data = await response.json();
      console.log("fetched recepies", data);
    };
    fetchRecipes();
  });

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
