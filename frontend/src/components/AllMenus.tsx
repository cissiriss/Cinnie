import { useEffect, useState } from "react";

interface Menu {
  id: number;
  menu_name: string;
  recipe: string;
}

const AllMenus = () => {
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

  if (menus.length === 0) {
    return <p>No menus found</p>;
  }

  return (
    <div className="container mx-auto py-4">
      <div className="prose">
        <h1>Menus</h1>
        <h2>{menus[0].menu_name}</h2>
        <ul>
          {menus.map((menu) => (
            <li key={menu.id}>
              <p>{menu.recipe}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllMenus;
