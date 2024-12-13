import GetRecipes from "./GetRecipes";

export default function Home() {
  return (
    <>
      <div className="container mx-auto py-4">
        <div className="prose">
          <h1>Meal planner</h1>
          <h2>Plan your weekly meals</h2>
          <ol>
            <li>Add your favourite recipe</li>
            <li>Add the recipe to a menu</li>
            <li>Create a grocery shopping list based on your menu</li>
          </ol>
        </div>
        <GetRecipes />
      </div>
    </>
  );
}
