import PropTypes from "prop-types";

export default function ProductCard({
  name,
  quantity,
  price,
  category,
  manufactur,
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
  // }, [count]);

  return (
    // --------------------------------------------Item Informations----------------------------------------
    <div className="bg-greensanta border-e-8 border-b-8 border-double border-redsanta text-yellowsanta p-28 py-10 shadow-2xl rounded-2xl">
      <div className="text-center font-semibold text-4xl mb-14 font-heading ">
        {name}
      </div>
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
      {/* <div className="flex flex-row justify-between font-heading text-2xl mt-5"> */}
      {/* <div className="flex flex-row gap-10"> */}
      {/* <button
            className="hover:text-redsanta active:text-earthsanta shadow-lg rounded-xl active:shadow-sm px-3"
            type="button"
            onClick={addItemToCart}
          >
            veux
          </button>
          <button
            className="hover:text-redsanta active:text-earthsanta shadow-lg rounded-xl active:shadow-sm p-2"
            type="button"
            onClick={removeItemFromCart}
          >
            {" "}
            veux pas
          </button> */}
      {/* </div>
        <div className=" bg-redsanta h-10 w-10 rounded-full text-center ml-14">
          {" "}
          {count}{" "}
        </div> */}
      {/* </div> */}
    </div>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  manufactur: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
