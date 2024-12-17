import { useEffect, useState } from "react";
import { Recipe } from "./GetRecipes";
import { useFormContext } from "react-hook-form";
import { MenuType } from "../types/types";

export default function SelectRecipe() {
  const [recipes, setRecipes] = useState<Recipe[]>();
  const [chosenRecipes, setChosenRecipes] = useState<string[]>([]);

  const { register, getValues } = useFormContext<MenuType>();

  useEffect(() => {
    fetch("http://localhost:3000/api/recipes/")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      });
  }, []);

  console.log(chosenRecipes);
  console.log(getValues("recipes"));

  return (
    <div className="flex flex-col overflow-y-scroll h-96">
      {recipes?.map((recipe) => (
        <>
          <p key={recipe.id}>{recipe.recipe_name}</p>

          <input
            {...register("recipes")}
            onChange={(value) =>
              setChosenRecipes([...chosenRecipes, value.target.value])
            }
            key={recipe.id}
            type="checkbox"
            className="checkbox"
            value={recipe.recipe_name}
          />
        </>
      ))}
    </div>
  );
}
