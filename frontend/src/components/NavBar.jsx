import { NavLink, useNavigate } from "react-router-dom";
import Snowfall from "react-snowfall";
import PropTypes from "prop-types";
import { NavManager } from "../services/Helper";
import logo from "../assets/logos/logo7.png";

export default function NavBar({ auth, setAuth }) {
  const navlinks = NavManager(auth?.updatedUser);
  const navigate = useNavigate();
  return (
    <nav className="  bg-greensanta lg:relative lg:rounded-xl shadow-2xl lg:border-s-8 lg:border-e-8 lg:border-double border-redsanta lg:mx-2 mt-1">
      <ul className="text-yellowsanta lg:mx-6 lg:text-3xl flex flex-row lg:justify-between">
        <li className="">
          <NavLink to="/">
            <img alt="logo" className="rounded-full h-20 lg:h-28" src={logo} />
          </NavLink>
        </li>
        <span className=" font-heading lg:text-5xl lg:mt-14 text-3xl mt-4 ml-2 inline-block align-baseline lg:left-36 lg:absolute ">
          {" "}
          la hotte du pere noel{" "}
        </span>
        <div className="hidden lg:flex flex-row gap-12">
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
        {auth !== undefined ? (
          <button
            className="font-heading absolute right-6 hover:text-redsanta bottom-6 underline-offset-2 underline decoration-wavy "
            type="button"
            onClick={() => {
              setAuth(undefined);
              navigate("/");
            }}
          >
            {" "}
            déconnexion{" "}
          </button>
        ) : null}
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
  setAuth: PropTypes.func().isRequired,
};
