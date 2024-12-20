import { Recipe } from "../types/types";

interface RecipeProps {
  recipes: Recipe[];
}

export default function AllRecipes(recipes: RecipeProps) {
  if (!recipes) {
    return <p>No recipes found</p>;
  }

  return (
    <div>
      <h1 className="text-4xl m-4 flex justify-center">All recipes</h1>
      <div className="flex items-center w-1/2 m-4 bg-base-300 ">
        <table className="table w-full justify-center">
          {recipes.recipes.map((recipe) => (
            <div key={recipe.id} className="flex flex-col justify-center m-6">
              <h3 key={recipe.id} className="text-2xl m-4">
                {recipe.recipe_name}
              </h3>
              <ul>
                <li key={recipe.id}>
                  {recipe.description && (
                    <p className="text-lg">Description: {recipe.description}</p>
                  )}
                  {recipe.instructions && (
                    <p className="text-lg">
                      How to make: {recipe.instructions}
                    </p>
                  )}

                  {recipe.cook_time && (
                    <p className="text-lg">Cook time: {recipe.cook_time}</p>
                  )}

                  <p className="text-lg">Servings: {recipe.servings}</p>
                </li>
              </ul>

              <tbody className="flex flex-col w-full items-center">
                {recipe.ingredients.map((ingredient) => (
                  <tr key={ingredient.ingredient_name}>
                    <td className="m-4 text-lg">
                      {ingredient.ingredient_name}
                    </td>
                    <td className="m-2 text-lg">{ingredient.quantity}</td>
                    <td className="text-lg">{ingredient.unit}</td>
                  </tr>
                ))}
              </tbody>
            </div>
          ))}
        </table>
      </div>
    </div>
  );
}
