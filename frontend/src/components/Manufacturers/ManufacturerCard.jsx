import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Modal } from "flowbite-react";

export default function ManufacturerCard({ name, country, id }) {
  const [productData, setProductData] = useState();
  useEffect(() => {
    axios.get(`http://localhost:3310/api/products/${id}`).then((res) => {
      setProductData(res.data);
    });
  }, []);
  const [visible, setVisible] = useState(false);
  const HandleClick = () => {
    setVisible(true);
  };
  return (
    <div className="bg-gradient-to-tl from-yellowsanta py-8 border-4 border-dashed border-redsanta font-heading">
      <button
        type="button"
        onClick={HandleClick}
        className="text-5xl hover:text-redsanta hover:underline"
      >
        {name}
      </button>
      <div className="text-3xl hover:text-earthsanta font-semibold"> </div>
      {country}
      <Modal
        dismissible
        className="font-heading h-50"
        show={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <div className="flex flex-row justify-between">
            <p className="text-3xl"> {name} </p>
            <p className="text-sm">{country}</p>
          </div>
        </Modal.Header>{" "}
        <Modal.Body className="text-2xl">
          <div className="leading-loose">
            {productData &&
              productData.map((p) => (
                <li key={id.id}>{p.product_name}</li>
              ))}{" "}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

ManufacturerCard.propTypes = {
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
