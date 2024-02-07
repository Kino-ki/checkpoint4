import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import { NavManager } from "../services/Helper";

export default function Footer({ auth }) {
  const [openNav, setOpenNav] = useState(false);
  const navlinks = NavManager(auth?.updatedUser);
  const navigate = useNavigate();

  return (
    <div className="lg:hidden flex flex-col fixed right-3 bottom-24">
      <div>
        <button
          type="button"
          className="text-9xl rouded-full mx-auto fixed right-6 bottom-8  "
          onClick={() => setOpenNav(!openNav)}
        >
          {" "}
          P{" "}
        </button>
        <p className="font-heading text-3xl fixed bottom-0 right-5">Menu</p>
      </div>
      <div className="flex flex-row justify-end">
        {openNav && (
          <div className="bg-[#93c47d] bg-opacity-95 rounded-xl flex flex-col h-64 text-end w-auto p-6 ">
            <ul>
              {navlinks?.map((n) => (
                <li key={n.id} className="my-5">
                  <button
                    type="button"
                    className="hover:text-redsanta font-heading text-yellowsanta text-end text-3xl active:text-earthsanta"
                    onClick={() => {
                      navigate(`${n.path}`);
                      setOpenNav(false);
                    }}
                  >
                    {n.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

Footer.propTypes = {
  auth: PropTypes.shape().isRequired,
};
