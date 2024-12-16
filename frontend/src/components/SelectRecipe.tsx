import { useEffect, useState } from "react";
import { Recipe } from "./GetRecipes";

export default function SelectRecipe() {
  const [recipes, setRecipes] = useState<Recipe[]>();

  useEffect(() => {
    fetch("http://localhost:3000/api/recipes/")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      });
  }, []);

  return (
    <>
      <select className="select select-success w-full max-w-md m-4">
        <option disabled selected>
          Recipes
        </option>
        {recipes?.map((recipe) => (
          <option key={recipe.id}>{recipe.recipe_name}</option>
        ))}
      </select>
    </>
  );
}
