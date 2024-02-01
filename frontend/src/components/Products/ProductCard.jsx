import PropTypes from "prop-types";
import axios from "axios";
import { Select, Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { arrayRange } from "../../services/Helper";

// ((((((((((((((((((((((((        WORK IN PROGESS (ordering productCard ^^)                     ))))))))))))))))))))))))

export default function ProductCard({
  name,
  quantity,
  price,
  category,
  manufactur,
  prodId,
}) {
  // --------------------------------------------- handle SELECT items quantity -------------------------------------------
  const [selectArray, setSelectArray] = useState([]);
  const [updateQuantity, setUpdateQuantity] = useState(false);
  const [toast, setToast] = useState(false);
  const [quantitySelected, setQuantitySelected] = useState();

  const { auth } = useOutletContext();

  useEffect(() => {
    let myNum;
    if (quantity > 15) {
      myNum = 15;
    } else {
      myNum = quantity;
    }
    setSelectArray(arrayRange(1, myNum, 1));
  }, []);

  // --------------------------------------------- handle Cart -------------------------------------------
  const handleCartQuantity = (e) => {
    const cartQuantity = e.target.value;
    setQuantitySelected(cartQuantity);
  };
  const handleCartPost = () => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/carts`,
        {
          product_id: prodId,
          quantity: quantitySelected,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      )
      .then(() => {
        setToast(true);
        setUpdateQuantity(true);
      });
  };

  useEffect(() => {
    if (updateQuantity) {
      axios.put(`${import.meta.env.VITE_URL_BACKEND}/products/${prodId}`, {
        quantitySelected,
        prodId,
      });
    }
  }, [updateQuantity]);

  return (
    // --------------------------------------------Item Informations----------------------------------------
    <div className="bg-greensanta flex flex-col justify-start border-e-8 font-heading border-b-8 border-double border-redsanta text-yellowsanta p-10 py-10 shadow-2xl rounded-2xl">
      <div className="text-center font-semibold text-4xl mb-14">{name}</div>
      <div className="flex flex-row justify-between">
        <div className="font-heading text-2xl underline underline-offset-4 decoration-wavy">
          {category}{" "}
        </div>
        <div className=" text-4xl font-heading mt-5 ml-28">${price}</div>
      </div>
      <div className="flex flex-row mt-10 justify-between gap-16">
        <div className="text-xl  flex flex-col">
          <div className="font-heading">quantité restante: {quantity}</div>
          <div className="font-heading">par: {manufactur} </div>
        </div>
        <div className="flex flex-col mt-3">
          <Select onChange={handleCartQuantity}>
            {selectArray.map((s) => (
              <option key={s} value={s}>
                {" "}
                {s}
              </option>
            ))}
          </Select>
          {/* ----------------------------------------------CART MANAGER---------------------------------------- */}
          <button
            type="button"
            onClick={handleCartPost}
            className="mt-4 text-lg hover:font-semibold font-extralight shadow-sm shadow-earthsanta border-earthsanta border border-double rounded-lg px-2"
          >
            ajouter au panier
          </button>
          {toast && (
            <Toast className="mr-4 shadow-xl">
              <HiCheck className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-orange-500 dark:bg-orange-700 dark:text-orange-200" />
              <div className="font-heading text-xl"> Produit ajouté </div>
              <Toast.Toggle />
            </Toast>
          )}
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  manufactur: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  prodId: PropTypes.number.isRequired,
};
