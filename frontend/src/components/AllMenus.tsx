import { useEffect, useState } from "react";

interface Menu {
  id: number;
  recipe_name: string;
  meal_plan_name: string;
}

const MenuForm = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/menus");
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

  return (
    <div className="container mx-auto py-4">
      <div className="prose">
        <h1>Menus</h1>
        {/* <ul>
          {menus.map((menu) => (
            <li key={menu.id}>
              <h2>{menu.name}</h2>
              <p>{menu.description}</p>
            </li>
          ))}
        </ul> */}
        <ul>
          {menus.map((menu) => (
            <li key={menu.id}>
              <p>{menu.meal_plan_name}</p>
              <p>{menu.recipe_name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuForm;
