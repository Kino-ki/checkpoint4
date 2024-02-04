import PropTypes from "prop-types";

export default function ExpediteCard({
  adress,
  firstname,
  lastname,
  product,
  quantity,
  price,
}) {
  const productList = product.split(",");
  const quantityList = quantity.split(",");
  const priceList = price.split(",");

  const toto = [];
  const tata = [];
  for (let i = 0; i < productList.length; i += 1) {
    const objects = {
      id: i + 1,
      product: productList[i],
      quantity: quantityList[i],
      price: priceList[i],
      subtotal: (Number(quantityList[i]) * Number(priceList[i])).toFixed(2),
    };
    tata.push(Number(quantityList[i]) * Number(priceList[i]));
    toto.push(objects);
  }

  return (
    <div className="flex flex-col lg:mx-12 mt-10">
      <div className="font-heading lg:p-10 p-2  border-black border-2 rounded-lg text-3xl">
        <div className="flex lg:flex-row gap-10">
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
        <table className=" w-full mt-10 lg:text-xl text-lg">
          <thead className="border-black  border-y-2">
            <tr>
              <th className=" font-semibold text-start">Product</th>
              <th className=" font-semibold text-end">Quantity</th>
              <th className="  text-end  font-semibold">Price/unit($)</th>
              <th className="   text-end font-semibold">Subtotal ($)</th>
            </tr>
          </thead>
          <tbody>
            {toto.map((t) => (
              <tr className="text-end" key={t.id}>
                <td className={t.id === 1 ? "text-start pt-6" : "text-start"}>
                  {" "}
                  {t.product}{" "}
                </td>
                <td className={t.id === 1 && "pt-6"}>{t.quantity}</td>
                <td className={t.id === 1 && "pt-6"}>{t.price}</td>
                <td className={t.id === 1 && "pt-6"}> {t.subtotal} </td>
              </tr>
            ))}
            <tr>
              <td className="text-yellowsanta">;</td>
            </tr>
          </tbody>
          <tfoot className="border-black border-t-2">
            <tr className="">
              <th colSpan="3" className="text-end ">
                {" "}
                Total:{" "}
              </th>
              <td className="text-end border-black border-t-2">
                {"$ "}
                {tata?.reduce((a, b) => a + b).toFixed(2)}{" "}
              </td>
            </tr>
          </tfoot>
        </table>
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
  price: PropTypes.number.isRequired,
};
