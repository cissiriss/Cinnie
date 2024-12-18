import { useFormContext } from "react-hook-form";
import SelectRecipe from "./SelectRecipe";
import { MenuType } from "../types/types";

const MenuForm = () => {
  const { register, handleSubmit } = useFormContext<MenuType>();

  const onSubmit = (data: MenuType) => {
    console.log(data);
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

          <SelectRecipe />
        </form>
        <button type="submit" className="btn btn-neutral m-4 w-full max-w-xs">
          Add Menu
        </button>
      </div>
    </div>
  );
};

export default MenuForm;
