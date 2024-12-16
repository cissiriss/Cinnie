import { Recipe } from "./GetRecipes";

interface RecipeProps {
  recipes: Recipe[];
}

export default function AllRecipes(recipes: RecipeProps) {
  if (!recipes) {
    return <p>No recipes found</p>;
  }

  return (
    <div>
      <h1>All recipes</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <ul>
            {recipes.recipes.map((recipe) => (
              <>
                <li key={recipe.id}>
                  <h2>{recipe.recipe_name}</h2>
                  {recipe.description && (
                    <p>Description: {recipe.description}</p>
                  )}
                  {recipe.instructions && (
                    <p>Instructions: {recipe.instructions}</p>
                  )}
                  {recipe.prep_time && <p>Prep time: {recipe.prep_time}</p>}
                  {recipe.cook_time && <p>Cook time: {recipe.cook_time}</p>}

                  <p>Servings: {recipe.servings}</p>
                </li>

                <tbody key={recipe.id}>
                  {recipe.ingredients.map((ingredient) => (
                    <tr key={ingredient.ingredient_name}>
                      <td className="m-4 ">{ingredient.ingredient_name}</td>
                      <td className="m-2">{ingredient.quantity_value}</td>
                      <td>{ingredient.unit_name}</td>
                    </tr>
                  ))}
                </tbody>
              </>
            ))}
          </ul>
        </table>
      </div>
    </div>
  );
}
