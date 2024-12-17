import SelectRecipe from "./SelectRecipe";

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
        // TODO add post request
        <button
          onClick={() => {}}
          className="btn btn-neutral m-4 w-full max-w-xs"
        >
          Add Menu
        </button>
      </div>
    </div>
  );
};

export default MenuForm;
