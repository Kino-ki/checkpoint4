/* eslint-disable react/jsx-props-no-spreading */
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function CreateProduct({ setUpdate }) {
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
        is_fav: 0,
        manufacturer: data.manufacturer,
        category: data.category,
      })
      .then(() => {
        setUpdate(true);
        setVisible(!visible);
      });
  };
  // ---------------------------------------------------------------------RENDER-------------------------------------
  return (
    <div>
      <h1 className="font-heading flex flex-row justify-end mr-96 text-3xl mt-10 ">
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
      <div className="flex flex-row justify-center mt-5 gap-5">
        {visible && (
          <div>
            <form
              className="flex flex-row gap-5 font-heading"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* --------------------------------------------- Product Name -------------------------------------*/}
              <div>
                <input
                  className="py-2 text-2xl"
                  type="text"
                  {...register("name", {
                    required: "Nom de produit obligatoire",
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
                  className="py-2 text-2xl"
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
                  className="py-2 text-2xl"
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
                  <select {...field} className="text-2xl">
                    <option className="" value="all">
                      {" "}
                      ---
                    </option>
                    {manuf &&
                      manuf.map((m) => (
                        <option className="" value={m.name}>
                          {" "}
                          {m.name}{" "}
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
                  <select {...field} className="text-2xl">
                    <option className="text-2xl" value="all">
                      ---
                    </option>
                    {uniquCat.map((categ) => (
                      <option className="text-2xl" value={categ}>
                        {" "}
                        {categ}{" "}
                      </option>
                    ))}
                  </select>
                )}
              />
              {/* ------------------------------------- submmit -------------------------------------*/}
              <button
                className=" bg-earthsanta rounded text-yellowsanta text-3xl px-9 shadow-2xl py-5 font-semibold active:bg-redsanta active:shadow-inner"
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
  setUpdate: PropTypes.bool.isRequired,
};
