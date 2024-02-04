import { Button, Toast } from "flowbite-react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { HiExclamation } from "react-icons/hi";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function CartCard({
  name,
  cartquantity,
  stockItems,
  id,
  setUpdate,
  prodId,
  userId,
}) {
  // --------------------------------------------- handle cart items quantity -------------------------------------------

  const [count, setCount] = useState(cartquantity);
  const [toast, setToast] = useState(false);
  const [updateStock, setUpdateStock] = useState(false);
  const [newOrder, setNewOrder] = useState(false);
  const { auth } = useOutletContext();
  const navigate = useNavigate();

  const addItem = () => {
    if (count < stockItems) {
      setCount(count + 1);
    } else {
      setToast(true);
    }
  };
  const removeItem = () => {
    if (count > 1) {
      setCount(count - 1);
    }
    if (count === 1) {
      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/api/carts/${prodId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then(() => {
          setUpdate(true);
          setCount(cartquantity);
        });
    }
  };
  const handleStockItems = () => {
    setUpdateStock(false);
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/carts/${prodId}`,
        {
          quantity: count,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      )
      .then(() => {
        setUpdate(true);
      });
  };

  const addToOrders = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
        user_id: userId,
        cart_id: id,
        product_id: prodId,
      })
      .then(() => {
        setNewOrder(true);
      });
  };
  useEffect(() => {
    if (newOrder) {
      axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/carts//neworder/${prodId}`,
        {
          is_ordered: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/stock/${prodId}`,
          {
            quantity: cartquantity,
          }
        )
        .then(() => navigate("/produits/commandes"));
    }
  });
  setTimeout(() => {
    setToast(false);
  }, "4000");

  return (
    <div className="lg:bg-redsanta bg-[#99324c] rounded-2xl py-3 shadow-2xl">
      <div className="flex lg:flex-row flex-col lg:justify-between px-10">
        <div className="font-heading text-center mb-2 text-4xl lg:text-6xl">
          {name}
        </div>
        <div className="flex flex-row justify-end">
          {toast && (
            <Toast className="mx-4 w-48 h-16 shadow-xl">
              <HiExclamation className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-orange-500 dark:bg-orange-700 dark:text-orange-200" />
              <div className="font-heading "> y-en-a plus!</div>
              <Toast.Toggle />
            </Toast>
          )}
          <Button
            type="button"
            className={`font-heading font-semibold ${
              updateStock ? "hidden" : "visible"
            } ml-4 h-10 outline outline-earthsanta bg-greensanta mt-4`}
            onClick={() => setUpdateStock(true)}
          >
            <p className="font-light lg:font-normal text-2xl lg:text-3xl">
              Modifier
            </p>
          </Button>
          <Button
            type="button"
            className={`font-heading ${
              !updateStock ? "hidden" : "visible"
            } font-semibold h-10 mt-4 bg-greensanta`}
            onClick={removeItem}
          >
            <p className="font-light lg:font-normal lg:text-3xl">-</p>
          </Button>
          <div
            className={`font-heading ${
              !updateStock ? "visible" : "hidden"
            } lg:text-6xl text-3xl font-light lg:font-normal mt-2 mx-3`}
          >
            {" "}
            {cartquantity}
          </div>
          <div
            className={`font-heading font-light lg:font-normal
          ${!updateStock ? "hidden" : "visible"}
          text-6xl mx-3`}
          >
            {" "}
            {count}
          </div>
          <Button
            type="button"
            className={`font-heading ${
              !updateStock ? "hidden" : "visible"
            } lg:font-semibold font-light h-10 mt-4 bg-greensanta`}
            onClick={addItem}
          >
            <p className="lg:text-3xl">+</p>
          </Button>
          <Button
            type="button"
            className={`font-heading font-semibold ml-4
            ${updateStock ? "hidden" : "visible"}       
            h-10 outline outline-earthsanta bg-greensanta mt-4`}
            onClick={addToOrders}
          >
            <p className="font-light lg:font-normal  text-2xl lg:text-3xl">
              J'achète
            </p>
          </Button>
          <Button
            type="button"
            className={`font-heading font-semibold w-32 ml-4 h-10 outline
            ${!updateStock ? "hidden" : "visible"}
            outline-earthsanta bg-greensanta mt-4`}
            onClick={handleStockItems}
          >
            <p className="text-xl">Je valide</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

CartCard.propTypes = {
  name: PropTypes.string.isRequired,
  cartquantity: PropTypes.number.isRequired,
  stockItems: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  setUpdate: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
  prodId: PropTypes.number.isRequired,
};
