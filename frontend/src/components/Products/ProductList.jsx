/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { TextInput, Select, RangeSlider, Label } from "flowbite-react";
import ProductCard from "./ProductCard";
import CreateProduct from "./CreateProduct";

export default function ProductList({ dbproducts }) {
  const products = dbproducts;
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [manuf, setManuf] = useState();
  const [categ, setCateg] = useState();

  // -------------------------------------------------------[AXIOS POST]Automatic update when query ----------------------------------------
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    if (update) {
      axios.get("http://localhost:3310/api/products/").then((res) => {
        setFilteredProducts(res.data);
        setUpdate(false);
      });
    }
  }, [update]);
  // --------------------------------------------------------- OnClick Function -----------------------
  const [visible, setVisible] = useState(false);
  const HandleClick = () => {
    setVisible(!visible);
  };
  // ------------------------------------------------ [FILTERS INPUT] GET cactegories & manufacturers ------------------------------------
  useEffect(() => {
    axios.get("http://localhost:3310/api/manufacturers").then((res) => {
      setManuf(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:3310/api/categories").then((res) => {
      setCateg(res.data);
    });
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
        <div className="font-heading text-3xl flex flex-row justify-start ml-96 mt-16">
          marre de chercher ? c'est{" "}
          <button
            className="text-earthsanta hover:text-redsanta underline ml-2"
            type="button"
            onClick={HandleClick}
          >
            {" "}
            ICI
          </button>
        </div>
        {visible && (
          <div className="flex flex-row justify-center gap-10 font-heading">
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
      <CreateProduct setUpdate={setUpdate} />
      {/* ---------------------------------------- MAP DATA AND LIST ----------------------------------------- */}
      <div className="flex flex-wrap justify-center p-32 pt-10 mt-16 gap-14">
        {filteredProducts.length ? (
          filteredProducts.map((p) => (
            <ProductCard
              setUpdate={setUpdate}
              key={p.id}
              id={p.id}
              name={p.product_name}
              quantity={p.quantity}
              price={p.price}
              category={p.category}
              manufactur={p.manufacturer}
            />
          ))
        ) : (
          <h1 className="font-heading text-5xl">
            Désolée petit lutin, mais on n'a rien comme cela b
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
      is_fav: PropTypes.number.isRequired,
      manufacturer: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};
