import PropTypes from "prop-types";
// import { useState, useEffect } from "react";
// import axios from "axios";
import { Select } from "flowbite-react";

// ((((((((((((((((((((((((        WORK IN PROGESS (ordering productCard ^^)                     ))))))))))))))))))))))))

export default function ProductCard({
  name,
  quantity,
  price,
  category,
  manufactur,
  // setUpdate,
  // id,
}) {
  // --------------------------------------------- handle cart items quantity -------------------------------------------
  // const [count, setCount] = useState(fav);
  // const addItemToCart = () => {
  //   if (quantity > 0) {
  //     setCount(count + 1);
  //   }
  // };
  // const removeItemFromCart = () => {
  //   if (fav > 0) {
  //     setCount(count - 1);
  //   }
  // };
  // ------------------------------------------------------AXIOS EDIT -----------------------------------
  // useEffect(() => {
  //   axios
  //     .put(`http://localhost:3310/api/products/${id}`, {
  //       is_fav: count,
  //       id,
  //     })
  //     .then(() => {
  //       setUpdate(true);
  //     });
  // }, [count])

  const arrayRange = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );
  let myNum;
  if (quantity > 15) {
    myNum = 15;
  } else {
    myNum = quantity;
  }

  const selectArray = arrayRange(1, myNum, 1);

  return (
    // --------------------------------------------Item Informations----------------------------------------
    <div className="bg-greensanta border-e-8 font-heading border-b-8 border-double border-redsanta text-yellowsanta p-28 py-10 shadow-2xl rounded-2xl">
      <div className="text-center font-semibold text-4xl mb-14">{name}</div>
      <div className="flex flex-row justify-between">
        <div className="font-heading text-2xl underline underline-offset-4 decoration-wavy">
          {category}{" "}
        </div>
        <div className=" text-4xl font-heading mt-5 ml-28">${price}</div>
      </div>
      <div className="text-xl mt-10">
        <div className="font-heading">quantité restante: {quantity}</div>
        <div className="font-heading">par: {manufactur} </div>
      </div>
      {/* ----------------------------------------------CART MANAGER---------------------------------------- */}
      <Select className="mx-6">
        {selectArray.map((s) => (
          <option value={s}> {s}</option>
        ))}
      </Select>
      <div className="flex flex-row justify-between font-heading text-2xl mt-5">
        {" "}
        <div className="flex flex-row gap-10">{}</div>
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
  // fav: PropTypes.number.isRequired,
  // setUpdate: PropTypes.func.isRequired,
  // id: PropTypes.number.isRequired,
};
