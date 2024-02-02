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
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/carts//neworder/${prodId}`,
          {
            is_ordered: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        )
        .then(() => navigate("/produits/commandes"));
    }
  });

  return (
    <div className="bg-redsanta rounded-2xl py-3 shadow-2xl">
      <div className="flex flex-row justify-between px-10">
        <div className="font-heading text-6xl">{name}</div>
        <div className="flex flex-row">
          {toast && (
            <Toast className="mr-4 shadow-xl">
              <HiExclamation className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-orange-500 dark:bg-orange-700 dark:text-orange-200" />
              <div className="font-heading text-xl"> y-en-a plus</div>
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
            <p className="text-3xl">Modifier</p>
          </Button>
          <Button
            type="button"
            className={`font-heading ${
              !updateStock ? "hidden" : "visible"
            } font-semibold h-10 mt-4 bg-greensanta`}
            onClick={removeItem}
          >
            <p className="text-3xl">-</p>
          </Button>
          <div
            className={`font-heading ${
              !updateStock ? "visible" : "hidden"
            } text-6xl mx-3`}
          >
            {" "}
            {cartquantity}
          </div>
          <div
            className={`font-heading 
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
            } font-semibold h-10 mt-4 bg-greensanta`}
            onClick={addItem}
          >
            <p className="text-3xl">+</p>
          </Button>
          <Button
            type="button"
            className={`font-heading font-semibold ml-4
            ${updateStock ? "hidden" : "visible"}       
            h-10 outline outline-earthsanta bg-greensanta mt-4`}
            onClick={addToOrders}
          >
            <p className="text-3xl">J'achète</p>
          </Button>
          <Button
            type="button"
            className={`font-heading font-semibold ml-4 h-10 outline
            ${!updateStock ? "hidden" : "visible"}
            outline-earthsanta bg-greensanta mt-4`}
            onClick={handleStockItems}
          >
            <p className="text-3xl">Je valide</p>
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
