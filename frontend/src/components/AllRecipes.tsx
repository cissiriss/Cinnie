import { Recipe } from "./GetRecipes";

interface RecipeProps {
  recipes: Recipe[];
}

export default function AllRecipes({ recipes }: RecipeProps) {
  console.log(recipes);

  return (
    <div>
      <h1>All recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h4>{recipe.recipe_name}</h4>
            <p>Description: {recipe.description}</p>
            <p>Instructions: {recipe.instructions}</p>
            <p>Prep time: {recipe.prep_time}</p>
            <p>Cook time: {recipe.cook_time}</p>
            <p>Servings: {recipe.servings}</p>
          </li>
          // {ingredients.map((ingredient) => (
          //   <li key={ingredient.id}>
          //     <p>Name: {ingredient.name}</p>
          //     <p>Unit: {ingredient.unit}</p>
          //     <p>Quantity: {ingredient.quantity}</p>
          //   </li>
          // ))}
        ))}
      </ul>
    </div>
  );
}
