import { useEffect, useState } from "react";
import { Ingredient, Menu } from "../types/types";

const ShoppingList: React.FC<{ menuId: number }> = ({ menuId }) => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [error, setError] = useState<string | null>(null);

  const ingredients: Ingredient[] = menus.flatMap((menu) => menu.ingredients);

  const fetchShoppingList = async (menuId: number) => {
    const response = await fetch(`/api/shoppinglist/${menuId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch shopping list");
    }
    return await response.json();
  };

  useEffect(() => {
    const fetchList = async () => {
      try {
        const data = await fetchShoppingList(menuId);
        setMenus(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };
    fetchList();
  }, [menuId]);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Shopping List</h2>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>
            {item.ingredient_name}: {item.quantity} {item.unit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
