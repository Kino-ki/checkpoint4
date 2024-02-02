import PropTypes from "prop-types";

export default function ExpediteCard({
  adress,
  firstname,
  lastname,
  product,
  quantity,
}) {
  return (
    <div className=" ">
      <div className="flex mt-10">
        <div className="font-heading p-10 border border-black mx-auto rounded-lg text-3xl">
          <div className="flex flex-row gap-10">
            <div>Firstname: </div>
            <div>{firstname} </div>
          </div>
          <div className="flex flex-row gap-10">
            <div>Lastname:</div>
            <div>{lastname}</div>
          </div>
          <div className="flex flex-row gap-10">
            <div>Address:</div>
            <div>{adress}</div>
          </div>
          <div className="flex flex-row gap-10">
            <div>Product:</div>
            <div>{product}</div>
          </div>
          <div className="flex flex-row gap-10">
            <div>Quantity:</div>
            <div>{quantity}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
ExpediteCard.propTypes = {
  adress: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};
