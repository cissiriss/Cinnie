import { Link } from "react-router-dom";
import logo from "../assets/Header.png";

interface Link {
  link: string;
  name: string;
}

export default function Navbar() {
  const Links: Link[] = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/addRecipe",
      name: "Add recipe",
    },
    {
      link: "/recipes",
      name: "All recipes",
    },
  ];

  return (
    <div>
      <nav className="container flex flex-col items-center w-full">
        <img src={logo} alt="Header" sizes="80" className="rounded-3xl m-4" />
        <div className="flex justify-center">
          <ul className=" flex flex-row m-4">
            {Links.map((link) => (
              <li className="m-4">
                <Link
                  role="button"
                  className="btn m-1 text-dark-green text-xl"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            <div className="dropdown m-4">
              <div
                tabIndex={0}
                role="button"
                className="btn m-1 text-dark-green text-xl "
              >
                Menus
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
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
