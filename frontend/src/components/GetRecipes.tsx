import { useEffect, useState } from "react";
import AllRecipes from "./AllRecipes";

interface Ingredient {
  ingredient_name: string;
  unit_name: string;
  quantity_value: number;
}

export interface Recipe {
  id: number;
  recipe_name: string;
  description: string;
  instructions: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  ingredients: Ingredient[];
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

  return <>{recipeData && <AllRecipes recipes={recipeData} />}</>;
}
