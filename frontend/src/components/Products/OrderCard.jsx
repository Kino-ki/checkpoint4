import PropTypes from "prop-types";

export default function OrderCard({ prodName, quantity, price }) {
  return (
    <div className="bg-redsanta rounded-2xl relative py-3 shadow-2xl">
      <div className="flex flex-row justify-between px-10">
        <div className="font-heading text-6xl">{prodName}</div>
        <div className="font-heading absolute left-[46rem] text-6xl">
          {quantity}
        </div>
        <div className="font-heading text-6xl">$ {price * quantity}</div>
      </div>
    </div>
  );
}
OrderCard.propTypes = {
  prodName: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};
