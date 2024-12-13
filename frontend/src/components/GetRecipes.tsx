import { useEffect, useState } from "react";
import AllRecipes from "./AllRecipes";

export interface Recipe {
  id: number;
  recipe_name: string;
  description: string;
  instructions: string;
  prep_time: number;
  cook_time: number;
  servings: number;

  ingredients: {
    name: string;
    unit: string;
    quantity: number;
  }[];
}

export default function GetRecipes() {
  const [recipeData, setRecipeData] = useState<Recipe[]>();

  const fetchRecipes = async () => {
    const response = await fetch("http://localhost:3000/api/recipes/");

    const data = await response.json();

    setRecipeData(data);
    console.log("data", data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      <h3>Recipes</h3>
      {recipeData && <AllRecipes recipes={recipeData} />}
    </>
  );
}
