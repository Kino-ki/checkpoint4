import { useLoaderData } from "react-router-dom";
import ProductList from "../../components/Products/ProductList";

export default function ProductsPage() {
  const products = useLoaderData();
  return (
    <div className="flex flex-col">
      <div className=" flex flex-row justify-center text-6xl lg:text-8xl font-semibold mt-2">
        {" "}
        <p className="hover:animate-ping hover:text-redsanta">p</p>
        <p className="hover:animate-ping hover:text-greensanta">r</p>{" "}
        <p className="hover:animate-ping hover:text-redsanta">o</p>{" "}
        <p className="hover:animate-ping hover:text-greensanta">d</p>{" "}
        <p className="hover:animate-ping hover:text-redsanta">u</p>
        <p className="hover:animate-ping hover:text-greensanta">i</p>
        <p className="hover:animate-ping hover:text-redsanta">t</p>{" "}
        <p className="hover:animate-ping hover:text-greensanta">s</p>
        <p className="font-medium text-9xl -mt-10 ml-5 hover:animate-spin hover:text-greensanta">
          C
        </p>
      </div>
      <div>{products && <ProductList dbproducts={products} />}</div>
    </div>
  );
}
