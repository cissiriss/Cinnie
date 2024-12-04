import SelectRecipe from "./SelectRecipe";
// interface Menu {
//   id: number;
//   name: string;
//   description: string;
// }

const MenuForm = () => {
  return (
    <div className="container flex flex-col items-center w-full">
      <div className="container flex flex-col items-center w-full max-w-md m-4">
        <input
          type="text"
          placeholder="Menu name"
          className="input input-bordered input-success w-full max-w-md m-4"
        />

        <SelectRecipe />

        <button className="btn btn-neutral m-4 w-full max-w-xs">
          Add Recipe
        </button>
      </div>
    </div>
  );
};

export default MenuForm;
