import { useEffect, useState } from "react";
import AllRecipes from "./AllRecipes";
import { Recipe } from "../types/types";

export default function GetRecipes() {
  const [recipeData, setRecipeData] = useState<Recipe[]>();

  const fetchRecipes = async () => {
    const response = await fetch("http://localhost:3000/api/recipes/");

    const data = await response.json();

    setRecipeData(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return <>{recipeData && <AllRecipes recipes={recipeData} />}</>;
}
