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
  // setIsUpdated,
  // isUpdated,
}) {
  // --------------------------------------------- handle SELECT items quantity -------------------------------------------
  const [selectArray, setSelectArray] = useState([]);
  // const [updateQuantity, setUpdateQuantity] = useState(false);
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
    setSelectArray(arrayRange(0, myNum, 1));
  }, []);
  setTimeout(() => {
    setToast(false);
  }, "2000");

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
          quantity: parseInt(quantitySelected, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      )
      .then(() => {
        setToast(true);
        // setUpdateQuantity(true); <<<--------------------------------- goes to cart (when validated)
      });
  };

  return (
    // --------------------------------------------Item Informations----------------------------------------
    <div className="bg-greensanta lg:bg-opacity-95 mt-10  flex flex-col relative w-full lg:w-auto mx-2 p-4 justify-start border-e-4 lg:border-e-8 font-heading border-b-4 lg:border-b-8 border-double border-redsanta text-yellowsanta lg:p-10 lg:py-10 shadow-2xl rounded-2xl">
      <div className="text-center font-semibold lg:text-4x my-2 text-3xl lg:mb-14">
        {name}
      </div>
      <div className="flex flex-row justify-between">
        <div className="font-heading lg:text-2xl underline underline-offset-4 decoration-wavy">
          {category}{" "}
        </div>
        <div className=" lg:text-4xl font-heading lg:mt-5 lg:ml-28">
          ${price}
        </div>
      </div>
      <div className="flex flex-row lg:mt-10 justify-between lg:gap-16">
        <div className="text-xl mt-5  flex flex-col">
          <div className="font-heading">quantité restante: {quantity}</div>
          <div className="font-heading">par: {manufactur} </div>
        </div>
        <div className="flex flex-col items-center mt-4 lg:mt-3">
          <Select onChange={handleCartQuantity}>
            {selectArray.map((s) => (
              <option className="mx-auto" key={s} value={s}>
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
        </div>
      </div>
      {toast && (
        <Toast className="mr-4 shadow-xl absolute top-2 -right-3 w-32 h-10">
          <HiCheck className="inline-flex shrink-0 items-center justify-center rounded-lg text-orange-500 dark:bg-orange-700 dark:text-orange-200" />
          <div className="font-heading"> Produit ajouté </div>
          <Toast.Toggle />
        </Toast>
      )}
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
  // setIsUpdated: PropTypes.func.isRequired,
  // isUpdated: PropTypes.bool.isRequired,
};
