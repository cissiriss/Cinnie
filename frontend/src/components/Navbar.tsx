import { Link } from "react-router-dom";
import logo from "../assets/Header.png";

export default function Navbar() {
  return (
    <div className="container flex flex-col items-center w-full">
      <nav>
        <img src={logo} alt="Header" sizes="80" className="rounded-3xl mt-12" />
        <div className="flex justify-center">
          <ul className=" flex flex-row m-4">
            <li className="m-4">
              <Link className="font-bold text-dark-green text-xl" to="/">
                Hem
              </Link>
            </li>
            <li className="m-4">
              <Link
                className="font-bold text-dark-green text-xl"
                to="/addRecipe"
              >
                Add recipe
              </Link>
            </li>
            <li className="m-4">
              <Link className="font-bold text-dark-green text-xl" to="/menus">
                Menus
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
