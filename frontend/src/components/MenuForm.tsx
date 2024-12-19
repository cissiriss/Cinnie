import { useForm } from "react-hook-form";

import { MenuType, Recipe } from "../types/types";
import { useEffect, useState } from "react";

const MenuForm = () => {
  const { register, watch, handleSubmit } = useForm<MenuType>();
  const [recipes, setRecipes] = useState<Recipe[]>();
  const [chosenRecipes, setChosenRecipes] = useState<string[]>([]);
  // const [chosenRecipesIds, setChosenRecipesIds] = useState<number[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const value = watch("recipes");

  useEffect(() => {
    fetch("http://localhost:3000/api/recipes/")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      });
  }, []);

  const onSubmit = (data: MenuType) => {
    fetch("http://localhost:3000/api/menu/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

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
                <p key={recipe.id}>{recipe.recipe_name}</p>

                <input
                  {...register("recipes")}
                  onChange={(value) => {
                    setChosenRecipes([...chosenRecipes, value.target.value]);
                    // setChosenRecipesIds([...chosenRecipesIds, value.target.id]);
                    // console.log("chosenRecipesIds", chosenRecipesIds);
                  }}
                  key={recipe.id}
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
