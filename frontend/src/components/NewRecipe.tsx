import RecipeForm from "./RecipeForm";

export default function NewRecepie() {
  return (
    <form>
      <RecipeForm />
      <div className="container flex max-w-md items-end">
        <button type="submit" className="btn btn-neutral m-12 max-w-xs flex">
          Save
        </button>
      </div>
    </form>
  );
}
