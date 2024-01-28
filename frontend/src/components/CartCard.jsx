import { Button, Toast } from "flowbite-react";
import { HiExclamation } from "react-icons/hi";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function CartCard({
  name,
  cartquantity,
  stockItems,
  id,
  setUpdate,
}) {
  // --------------------------------------------- handle cart items quantity -------------------------------------------
  const [count, setCount] = useState(cartquantity);
  const [toast, setToast] = useState(false);
  const addItem = () => {
    if (stockItems > 0) {
      setCount(count + 1);
    } else {
      setToast(true);
    }
  };
  const removeItem = () => {
    if (count > 0) {
      setCount(count - 1);
      setToast(false);
    }
  };
  useEffect(() => {
    axios
      .put(`http://localhost:3310/api/products/${id}`, {
        is_fav: count,
        id,
      })
      .then(() => {
        setUpdate(true);
      });
  }, [count]);

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
            className="font-heading font-semibold h-10 mt-4 bg-greensanta"
            onClick={removeItem}
          >
            <p className="text-3xl">-</p>
          </Button>
          <div className="font-heading text-6xl mx-3"> {count}</div>
          <Button
            type="button"
            className="font-heading font-semibold h-10 bg-greensanta mt-4"
            onClick={addItem}
          >
            <p className="text-3xl">+</p>
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
};
