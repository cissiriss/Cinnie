import { useEffect, useState } from "react";
import ShoppingList from "./ShoppingList";
import { Recipe } from "../types/types";

interface Menu {
  menu_id: number;
  menu_name: string;
  recipes: Recipe[];
}

const AllMenus = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch("/api/menus");
        if (!response.ok) {
          throw new Error("Failed to fetch menus");
        }
        const data = await response.json();
        setMenus(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };
    fetchMenus();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (menus.length === 0) {
    return <p>No menus found</p>;
  }

  const viewShoppingList = async (menuId: number) => {
    setSelectedMenuId(menuId);
  };

  return (
    <div className="container mx-auto py-4">
      <div className="prose">
        <h1>Menus</h1>
        {menus.map((menu) => (
          <div key={menu.menu_id} className="menu-item">
            <h2>{menu.menu_name}</h2>
            <ul>
              {menu.recipes.map((recipe, index) => (
                <li key={index}>{recipe.recipe_name}</li>
              ))}
            </ul>
            <button
              onClick={() => viewShoppingList(menu.menu_id)}
              className="btn btn-neutral m-4 w-full max-w-xs"
            >
              Create shopping list
            </button>
          </div>
        ))}
        {selectedMenuId && <ShoppingList menuId={selectedMenuId} />}{" "}
      </div>
    </div>
  );
};

export default AllMenus;
