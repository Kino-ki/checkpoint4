import { NavLink } from "react-router-dom";
import Snowfall from "react-snowfall";
import logo from "../assets/logos/logo7.png";

export default function NavBar() {
  const navlinks = [
    {
      id: 1,
      path: "/produits",
      title: "produits",
    },
    {
      id: 2,
      path: "/produits/fabricants",
      title: "fabricants",
    },
    {
      id: 3,
      path: "/produits/listenoel",
      title: "N liste du pere noel N",
    },
    {
      id: 4,
      path: "/produits/commandes",
      title: "N commandes N",
    },
    {
      id: 5,
      path: "/profil/inscription",
      title: "inscription",
    },
    {
      id: 6,
      path: "/profil/connexion",
      title: "connexion",
    },
  ];
  return (
    <nav className="bg-greensanta rounded-xl shadow-2xl border-s-8 border-e-8 border-double border-redsanta mx-2 mt-1">
      <ul className="text-yellowsanta lg:mx-6 lg:text-3xl flex flex-row justify-between">
        <li>
          <NavLink to="/">
            <img alt="logo" className="rounded-full h-28" src={logo} />
          </NavLink>
        </li>
        <span className="font-toto font-heading text-5xl inline-block align-baseline -ml-32 ">
          {" "}
          la hotte du pere noel{" "}
        </span>
        <div className="flex flex-row gap-12">
          {navlinks.map((n) => (
            <li key={n.id}>
              <NavLink
                className="hover:text-redsanta active:text-earthsanta"
                to={n.path}
              >
                {n.title}
              </NavLink>
            </li>
          ))}
        </div>
      </ul>
      <Snowfall
        changeFrequency={600}
        snowflakeCount={50}
        style={{ height: "17vh" }}
      />
    </nav>
  );
}
