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
                to="/addRecipe">
                Add recipe
              </Link>
            </li>
            {/* Test dropdown */}
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1">
                Menus
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li>
                  <Link className="text-dark-green" to="/menus">
                    See menus
                  </Link>
                </li>
                <li>
                  <Link className="text-dark-green" to="/addMenu">
                    Add menu
                  </Link>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}
