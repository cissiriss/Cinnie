import Home from "./components/Home";
import Navbar from "./components/Navbar";
import RecipeForm from "./components/RecipeForm";
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";

function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: "/" },
        { element: <RecipeForm />, path: "/addRecipe" },
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
