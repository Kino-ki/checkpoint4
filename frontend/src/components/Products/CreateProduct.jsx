/* eslint-disable react/jsx-props-no-spreading */
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function CreateProduct({ setIsUpdated }) {
  // -----------------------------------------------------------define the form--------------------------------------
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // --------------------------------------------------------- OnClick Function -----------------------
  const [visible, setVisible] = useState(false);
  const HandleClick = () => {
    setVisible(!visible);
  };
  // --------------------------------------------------- fetch MANUFACTURERS for the select options-----------------------
  const [manuf, setManuf] = useState();
  useEffect(() => {
    axios.get("http://localhost:3310/api/manufacturers/").then((res) => {
      setManuf(res.data);
    });
  }, []);

  // --------------------------------------------------fetch CATEGORIES for the select option----------------------------
  const [cat, setCat] = useState();
  useEffect(() => {
    axios.get("http://localhost:3310/api/products").then((res) => {
      setCat(res.data);
    });
  }, []);
  const uniquCat = [...new Set(cat && cat.map((c) => c.category))];
  // --------------------------------------------------On Submit Function ---------------------------------------

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3310/api/products", {
        name: data.name,
        quantity: data.quantity,
        price: data.price,
        manufacturer: data.manufacturer,
        category: data.category,
      })
      .then(() => {
        setIsUpdated(true);
        setVisible(!visible);
      });
  };
  // ---------------------------------------------------------------------RENDER-------------------------------------
  return (
    <div>
      <h1 className="font-heading flex flex-row lg:justify-end lg:mr-96 text-2xl lg:text-3xl lg:mt-3">
        {" "}
        Tu veux ajouter quelque chose? C'est{" "}
        <button
          className="text-earthsanta hover:text-redsanta underline "
          type="button"
          onClick={HandleClick}
        >
          ICI
        </button>{" "}
      </h1>
      <div className="flex flex-col lg:flex-row justify-center lg:mt-5 lg:gap-5">
        {visible && (
          <div>
            <form
              className="flex flex-col items-center lg:flex-row gap-3 lg:gap-5 font-heading relative"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* --------------------------------------------- Product Name -------------------------------------*/}
              <div>
                <input
                  className="lg:py-2 lg:text-2xl rounded-lg"
                  type="text"
                  {...register("name", {
                    required: "Nom de produit obligatoire ",
                    minLength: {
                      value: 2,
                      message: "nom doit contenir au  moins deux lettres",
                    },
                  })}
                  placeholder="nom du produit"
                />
                {errors.name && (
                  <p className="text-xl">{errors.name?.message}</p>
                )}
              </div>
              {/* -------------------------------------------------- Product quantity -------------------------------------*/}
              <div>
                <input
                  className="lg:py-2 lg:text-2xl rounded-lg"
                  type="number"
                  {...register("quantity", {
                    required: "Quantité obligatoire",
                    min: {
                      value: 1,
                      message: "Au moins 1 item s'il te plait",
                    },
                    max: {
                      value: 300,
                      message:
                        "pas plus de 300, l'entrepôt du père Noël c'est pas amazon",
                    },
                  })}
                  placeholder="Quantité"
                />
                {errors.quantity && (
                  <p className="text-xl">{errors.quantity?.message}</p>
                )}
              </div>

              {/* -------------------------------------Product Price -------------------------------------*/}
              <div>
                <input
                  className="lg:py-2 lg:text-2xl rounded-lg"
                  type="number"
                  {...register("price", {
                    required: "prix obligatoire",
                    min: {
                      value: 10,
                      message: "prix doit être au moins 10$ (inflation bruh)",
                    },
                    max: {
                      value: 100000,
                      message: "faut pas exagérer non plus",
                    },
                  })}
                  placeholder="Prix"
                />
                {errors.price && (
                  <p className="text-xl">{errors.price?.message}</p>
                )}
              </div>
              {/* -------------------------------------select manufacturer------------------------------------- */}
              <Controller
                name="manufacturer"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select
                    {...field}
                    className="lg:py-2 lg:text-2xl rounded-lg mx-auto"
                  >
                    <option className="" value="all">
                      {" "}
                      ---
                    </option>
                    {manuf &&
                      manuf.map((m) => (
                        <option className="" value={m.manuf_name}>
                          {" "}
                          {m.manuf_name}{" "}
                        </option>
                      ))}
                  </select>
                )}
              />
              {/* ------------------------------------- select category -------------------------------------*/}
              <Controller
                name="category"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select
                    {...field}
                    className="lg:py-2 lg:text-2xl mx_auto rounded-lg"
                  >
                    <option className="lg:text-2xl" value="all">
                      ---
                    </option>
                    {uniquCat.map((categ) => (
                      <option className="lg:text-2xl mx-auto" value={categ}>
                        {" "}
                        {categ}{" "}
                      </option>
                    ))}
                  </select>
                )}
              />
              {/* ------------------------------------- submmit -------------------------------------*/}
              <button
                className=" bg-earthsanta rounded-lg text-yellowsanta lg:text-3xl lg:px-9 shadow-2xl lg:py-2 font-semibold active:bg-redsanta active:shadow-inner"
                type="submit"
              >
                ajouter
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

CreateProduct.propTypes = {
  setIsUpdated: PropTypes.bool.isRequired,
};
