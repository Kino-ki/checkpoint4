import { NavLink } from "react-router-dom";
import Snowfall from "react-snowfall";
import PropTypes from "prop-types";
import { NavManager } from "../services/Helper";
import logo from "../assets/logos/logo7.png";

export default function NavBar({ auth }) {
  const navlinks = NavManager(auth?.updatedUser);
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
          {navlinks &&
            navlinks?.map((n) => (
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

NavBar.propTypes = {
  auth: PropTypes.shape().isRequired,
};
