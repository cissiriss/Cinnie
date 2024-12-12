import { useEffect } from "react";

export default function GetRecipes() {
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/recipes/");
        if (!response.ok) {
          throw new Error("Failed to fetch menus");
        }
        const data = await response.json();
        console.log(data);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }
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
