import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NewRecipe from "./components/NewRecipe";
import MenuList from "./components/MenuList";
import NewMenu from "./components/NewMenu";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";

function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: "/" },
        { element: <NewRecipe />, path: "/addRecipe" },
        { element: <MenuList />, path: "/menus" },
        { element: <NewMenu />, path: "/addMenu" },
      ],
      element: (
        <>
          <main>
            <Navbar />
            <Outlet />
          </main>
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
