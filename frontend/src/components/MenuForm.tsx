import { useForm } from "react-hook-form";

import { PostMenu, Recipe } from "../types/types";
import { useEffect, useState } from "react";

const MenuForm = () => {
  const { register, handleSubmit } = useForm<PostMenu>();
  const [recipes, setRecipes] = useState<Recipe[]>();
  const [chosenRecipesIds, setChosenRecipesIds] = useState<number[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const value = watch("recipe_ids");

  const handleRecipeSelection = (recipeId: number) => {
    console.log(recipeId);
    setChosenRecipesIds((prev) => {
      if (prev.includes(recipeId)) {
        return prev.filter((id) => id !== recipeId);
      } else {
        return [...prev, recipeId];
      }
    });
    console.log(chosenRecipesIds);
  };

  const onSubmit = (data: PostMenu) => {
    fetch("http://localhost:3000/api/menu/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menu_name: data.menu_name,
        recipe_ids: chosenRecipesIds,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Menu created successfully:", result);
      })
      .catch((error) => {
        console.error("Error creating menu:", error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/recipes/")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <div className="container flex flex-col items-center w-full">
      <div className="container flex flex-col items-center w-full max-w-md m-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("menu_name")}
            type="text"
            placeholder="Menu name"
            className="input input-bordered input-success w-full max-w-md m-4"
          />

          <div className="flex flex-col overflow-y-scroll h-96">
            {recipes?.map((recipe) => (
              <>
                <p key={`recipe.id-${recipe.id}`}>{recipe.recipe_name}</p>

                <input
                  key={recipe.id}
                  onChange={() => handleRecipeSelection(recipe.id)}
                  type="checkbox"
                  className="checkbox"
                  value={recipe.recipe_name}
                />
              </>
            ))}
          </div>

          <button type="submit" className="btn btn-neutral m-4 w-full max-w-xs">
            Add Menu
          </button>
        </form>
      </div>
    </div>
  );
};

export default MenuForm;
