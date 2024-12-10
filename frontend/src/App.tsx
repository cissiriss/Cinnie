import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NewRecipe from "./components/NewRecipe";
import NewMenu from "./components/NewMenu";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import AllMenus from "./components/AllMenus";

import RecipeFormProvider from "./providers/FormProvider";

function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: "/" },
        { element: <NewRecipe />, path: "/addRecipe" },
        { element: <AllMenus />, path: "/menus" },
        { element: <NewMenu />, path: "/addMenu" },
      ],
      element: (
        <>
          <main>
            <RecipeFormProvider>
              <Navbar />
              <Outlet />
            </RecipeFormProvider>
          </main>
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
