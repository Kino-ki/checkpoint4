/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const passwordRef = useRef({});
  passwordRef.current = watch("password", "");

  const notify = () =>
    toast.warn("Les conditions d'utilisations n'ont pas été acceptées");

  const onSubmit = (data) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, data)
      .then(navigate("/user/login"));
  };

  return (
    <div className="flex flex-col justify-center align-middle">
      <div className=" flex flex-row justify-center text-7xl font-semibold my-6">
        <p className="hover:animate-ping hover:text-redsanta">i</p>
        <p className="hover:animate-ping hover:text-greensanta">n</p>{" "}
        <p className="hover:animate-ping hover:text-redsanta">s</p>{" "}
        <p className="hover:animate-ping hover:text-greensanta">c</p>{" "}
        <p className="hover:animate-ping hover:text-redsanta">r</p>
        <p className="hover:animate-ping hover:text-greensanta">i</p>
        <p className="hover:animate-ping hover:text-redsanta">p</p>{" "}
        <p className="hover:animate-ping hover:text-greensanta">t</p>
        <p className="hover:animate-ping hover:text-redsanta">i</p>{" "}
        <p className="hover:animate-ping hover:text-greensanta">o</p>
        <p className="hover:animate-ping hover:text-redsanta">n</p>{" "}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="font-heading ">
        {/* (((((((((((((((((((((((((((((((((((((((((())))))))))))))             USERNAME              ((((((((((())))))))))))))))))))))))))))))))))))))) */}
        <div className=" flex flex-col justify-center align-middle gap-5 py-10 mx-96 border-b-4 border-t-4 border-double border-redsanta ">
          <div className="flex flex-col ">
            <div className="flex flex-row justify-center">
              <div className="flex flex-col">
                <input
                  type="text"
                  className="rounded-xl lg:w-72 shadow-sm shadow-greensanta lg:hover:w-80 focus:w-80 transition-all ease-in-out text-2xl"
                  {...register("username", {
                    required: "Champ obligatoire",
                    minLength: {
                      value: 3,
                      message: "doit contenir au moins 3 caractères",
                    },
                  })}
                  placeholder="pseudo du lutin"
                />
                {errors.username && (
                  <p role="alert">{errors.username.message}</p>
                )}
              </div>
            </div>
          </div>
          {/* ((((((((((((((((((((((((((((((((((((((((()))))))))))))             EMAIL              ((((((((((())))))))))))))))))))))))))))))))))))))) */}
          <div className="flex flex-row justify-center">
            <div className="flex flex-col ">
              <input
                className="rounded-xl lg:w-72 shadow-sm shadow-greensanta lg:hover:w-80 focus:w-80 transition-all ease-in-out text-2xl"
                type="email"
                {...register("email", {
                  required: "champ obligatoire",
                  pattern: {
                    value: /\./,
                    message: "doit contenir un point",
                  },
                })}
                placeholder="lutin@lutinerie.com"
              />
              {errors.email?.message && (
                <p role="alert">
                  {" "}
                  {errors.email.message || "Champ obligatoire"}{" "}
                </p>
              )}
            </div>
          </div>
          {/* ((((((((((((((((((((((((((((((((((((((((()))))))))))))             PASSWORD              ((((((((((())))))))))))))))))))))))))))))))))))))) */}
          <div className="flex flex-row justify-center">
            <div className="flex flex-col">
              <input
                className="rounded-xl lg:w-72 shadow-sm shadow-greensanta lg:hover:w-80 focus:w-80 transition-all ease-in-out text-2xl"
                type="password"
                id="password"
                {...register("password", {
                  required: "champ obligatoire",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
                    message:
                      "doit contenir au moins 8 caractères dont au moins une majuscule, une miniscule, un chiffre et un caractère spécial ",
                  },
                })}
                placeholder="mot de passe"
              />
              {errors.password && (
                <p role="alert"> {errors.password.message}</p>
              )}
            </div>
          </div>
          {/* ((((((((((((((((((((((((((((((((((((((((((()))))))))))))))             PASSWORD 2              ((((((((((())))))))))))))))))))))))))))))))))))))) */}
          <div className="flex flex-row justify-center">
            <div className="flex flex-col">
              <input
                className="rounded-xl lg:w-72 shadow-sm shadow-greensanta lg:hover:w-80 focus:w-80 transition-all ease-in-out text-2xl"
                type="password"
                {...register("confirmpassword", {
                  required: "champ obligatoire",
                  validate: (value) =>
                    value === passwordRef.current ||
                    "mots de passe non similaires",
                })}
                placeholder="verif du mot de passe"
              />
              {errors.confirmpassword && (
                <p role="alert" className="text-lg font-light">
                  {errors.confirmpassword.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <button
              type="submit"
              onClick={notify}
              className="text-2xl hover:font-semibold"
            >
              soumsoum
            </button>
            {/* <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              toastClassName="rounded-md text-lg"
            /> */}
          </div>
        </div>
      </form>
    </div>
  );
}
