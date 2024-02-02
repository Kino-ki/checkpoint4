import axios from "axios";
import { useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setAuth } = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        setAuth(res.data);
        navigate("/produits");
      });
  };

  return (
    <div className=" border-redsanta flex-flex-col">
      <div className=" flex flex-row justify-center text-7xl font-semibold my-6">
        <div className=" flex flex-row justify-center text-7xl  my-6">
          <p className="hover:animate-ping hover:text-greensanta">c</p>{" "}
          <p className="hover:animate-ping hover:text-redsanta">o</p>{" "}
          <p className="hover:animate-ping hover:text-greensanta">n</p>{" "}
          <p className="hover:animate-ping hover:text-redsanta">n</p>
          <p className="hover:animate-ping hover:text-greensanta">e</p>
          <p className="hover:animate-ping hover:text-redsanta">x</p>{" "}
          <p className="hover:animate-ping hover:text-greensanta">i</p>
          <p className="hover:animate-ping hover:text-redsanta">o</p>{" "}
          <p className="hover:animate-ping hover:text-greensanta">n</p>
        </div>
      </div>
      <form
        className="font-heading flex flex-col justify-center lg:gap-6 py-11 items-center"
        onSubmit={handleSubmit}
      >
        <input
          ref={emailRef}
          type="email"
          id="email"
          placeholder="EMAIL"
          className="rounded-xl  shadow-sm shadow-greensanta lg:w-96  text-2xl lg:hover:w-[30rem] focus:w-80 transition-all ease-in-out"
        />
        <input
          ref={passwordRef}
          type="password"
          id="password"
          className="rounded-xl shadow-sm shadow-greensanta lg:w-96  text-2xl lg:hover:w-[30rem] focus:w-80 transition-all ease-in-out"
        />
        <button type="submit" className="text-2xl hover:font-bold">
          ENVOYER
        </button>
      </form>
    </div>
  );
}
