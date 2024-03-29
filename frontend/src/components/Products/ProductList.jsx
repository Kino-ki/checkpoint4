/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useOutletContext, useNavigate } from "react-router-dom";
import { TextInput, Select, RangeSlider, Label } from "flowbite-react";
import ProductCard from "./ProductCard";
import CreateProduct from "./CreateProduct";

export default function ProductList({ dbproducts }) {
  const products = dbproducts;
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [manuf, setManuf] = useState();
  const [categ, setCateg] = useState();
  const [userData, setUserData] = useState();
  const [isUpdated, setIsUpdated] = useState(false);

  const { auth } = useOutletContext();
  const navigate = useNavigate();

  // -------------------------------------------------------[AXIOS POST]Automatic update when query ----------------------------------------
  useEffect(() => {
    if (isUpdated) {
      axios.get("http://localhost:3310/api/products/").then((res) => {
        setFilteredProducts(res.data);
        setIsUpdated(false);
      });
    }
  }, [isUpdated]);
  // --------------------------------------------------------- OnClick Function -----------------------
  const [visible, setVisible] = useState(false);
  const HandleClick = () => {
    setVisible(!visible);
  };
  // ------------------------------------------------ [FILTERS INPUT] GET cactegories & manufacturers ------------------------------------
  useEffect(() => {
    if (!auth) {
      navigate("/profil/connexion");
    }
    axios.get("http://localhost:3310/api/manufacturers").then((res) => {
      setManuf(res.data);
    });

    axios.get("http://localhost:3310/api/categories").then((res) => {
      setCateg(res.data);
    });

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      })
      .then((res) => setUserData(res.data[0]));
  }, []);
  // --------------------------------------------------------[FILTERS] handleChange inputs functions ---------------------------------------------------------

  const [nameValue, setNameValue] = useState("");
  const [manufValue, setManufValue] = useState("All");
  const [categValue, setCategValue] = useState("All");
  const [priceValue, setPriceValue] = useState(0);

  const handlenamefilter = (e) => {
    const searchInput = e.target.value.toLowerCase();
    setNameValue(searchInput);
    setFilteredProducts(
      products.filter(
        (p) =>
          p.product_name.toLowerCase().includes(searchInput) &&
          (manufValue === "All" || p.manufacturer === manufValue) &&
          (categValue === "All" || p.category === categValue) &&
          p.price <= priceValue
      )
    );
  };

  const handleManuffilter = (e) => {
    const manufSelected = e.target.value;
    setManufValue(manufSelected);
    setFilteredProducts(
      products.filter(
        (p) =>
          (manufSelected === "All" || p.manufacturer === manufSelected) &&
          p.product_name.toLowerCase().includes(nameValue) &&
          (categValue === "All" || p.category === categValue) &&
          p.price <= priceValue
      )
    );
  };

  const handleCategfilter = (e) => {
    const categorySelected = e.target.value;
    setCategValue(categorySelected);
    setFilteredProducts(
      products.filter(
        (p) =>
          (categorySelected === "All" || p.category === categorySelected) &&
          (manufValue === "All" || p.manufacturer === manufValue) &&
          p.product_name.toLowerCase().includes(nameValue) &&
          p.price <= priceValue
      )
    );
  };
  const handleRangeChange = (e) => {
    const priceSelected = e.target.value;
    setPriceValue(priceSelected);
    setFilteredProducts(
      products.filter(
        (p) =>
          p.price <= priceSelected &&
          (categValue === "All" || p.category === categValue) &&
          (manufValue === "All" || p.manufacturer === manufValue) &&
          p.product_name.toLowerCase().includes(nameValue)
      )
    );
  };

  return (
    <div className="flex flex-col justify-center align-middle">
      {/* ---------------------------------------------------------FILTERS INPUT -------------------------------------------------------- */}
      <div className="flex flex-col">
        <div className="font-heading lg:text-3xl text-2xl flex flex-row justify-start lg:ml-96 lg:mt-5">
          marre de chercher ? c'est{" "}
          <button
            className="text-earthsanta hover:text-redsanta underline lg:ml-2"
            type="button"
            onClick={HandleClick}
          >
            {" "}
            ICI
          </button>
        </div>
        {visible && (
          <div className="flex flex-row justify-center lg:gap-10 font-heading">
            {/* ---------------------------------------------------------[FILTERS INPUT] name-------------------------------------------------------- */}
            <TextInput
              placeholder="nom"
              required
              color="gray"
              className="font-heading"
              onChange={handlenamefilter}
            />
            {/* ---------------------------------------------------------[FILTERS INPUT] Manufacturer-------------------------------------------------------- */}
            <Select onChange={handleManuffilter}>
              <option value="All"> --- </option>
              {manuf &&
                manuf.map((p) => (
                  <option className=" text-2xl" key={p.id} value={p.manuf_name}>
                    {" "}
                    {p.manuf_name}{" "}
                  </option>
                ))}
            </Select>
            {/* ---------------------------------------------------------[FILTERS INPUT] Category-------------------------------------------------------- */}
            <Select onChange={handleCategfilter}>
              <option value="All"> --- </option>
              {categ &&
                categ.map((c) => (
                  <option
                    className=" text-2xl"
                    key={c.id}
                    value={c.category_name}
                  >
                    {" "}
                    {c.category_name}{" "}
                  </option>
                ))}
            </Select>
            <div>
              {/* ---------------------------------------------------------[FILTERS INPUT] Price-------------------------------------------------------- */}
              <RangeSlider
                id="price"
                min={0}
                max={3500}
                step={10}
                onChange={handleRangeChange}
              />
              <div className="flex flex-row justify-between">
                <Label htmlFor="price" value="min : 0" />
                <Label htmlFor="price" value={`max :${priceValue}`} />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* ---------------------------------------- CREATE PRODUCT COMPONENT----------------------------------------- */}
      <CreateProduct setIsUpdated={setIsUpdated} />
      {/* ---------------------------------------- MAP DATA AND LIST ----------------------------------------- */}
      <div className="flex flex-wrap justify-center lg:p-10 lg:gap-14 gap-8">
        {filteredProducts.length ? (
          filteredProducts.map((p) => (
            <ProductCard
              setIsUpdated={setIsUpdated}
              key={p.id}
              prodId={p.id}
              name={p.product_name}
              quantity={p.quantity}
              price={p.price}
              category={p.category}
              userId={userData?.id}
              manufactur={p.manufacturer}
              isUpdated={isUpdated}
            />
          ))
        ) : (
          <h1 className="font-heading text-5xl">
            Désolée petit lutin, mais on ne l'a pas encore.
          </h1>
        )}
      </div>
    </div>
  );
}

ProductList.propTypes = {
  dbproducts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      manufacturer: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
    })
  ).isRequired,
};
