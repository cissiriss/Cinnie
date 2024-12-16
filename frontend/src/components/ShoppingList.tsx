import { useEffect, useState } from "react";

interface Ingredient {
  ingredient_name: string;
  quantity: number;
  unit: string;
}

const ShoppingList: React.FC<{ menuId: number }> = ({ menuId }) => {
  const [shoppingList, setShoppingList] = useState<Ingredient[]>([]);
  const [error, setError] = useState<string | null>(null);

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
        setShoppingList(data);
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

  console.log("shoppingList", shoppingList);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Shopping List</h2>
      <ul>
        {shoppingList.map((item, index) => (
          <li key={index}>
            {item.ingredient_name}: {item.quantity} {item.unit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
