import { useLoaderData } from "react-router-dom";
import OrderCard from "../../components/Products/OrderCard";

export default function OrdersPage() {
  const orders = useLoaderData();

  return (
    <div className="">
      <div className=" flex flex-row justify-center text-8xl font-semibold mt-14">
        <p className="font-medium text-9xl -mt-10 mr-10 hover:animate-spin hover:text-redsanta ">
          {" "}
          A{" "}
        </p>
        <p className="hover:animate-ping hover:text-redsanta">c</p>
        <p className="hover:animate-ping hover:text-greensanta">o</p>{" "}
        <p className="hover:animate-ping hover:text-redsanta">m</p>{" "}
        <p className="hover:animate-ping hover:text-greensanta">m</p>{" "}
        <p className="hover:animate-ping hover:text-redsanta">a</p>
        <p className="hover:animate-ping hover:text-greensanta">n</p>
        <p className="hover:animate-ping hover:text-redsanta">d</p>{" "}
        <p className="hover:animate-ping hover:text-greensanta">e</p>
        <p className="hover:animate-ping hover:text-redsanta">s</p>{" "}
        <p className="font-medium text-9xl -mt-10 ml-10 hover:animate-spin hover:text-greensanta">
          {" "}
          B{" "}
        </p>
      </div>
      <div className="flex flex-row mx-10 justify-between px-10 font-heading text-4xl mt-20 mb-5  underline underline-offset-2 decoration-dotted decoration-greensanta ">
        <div>nom</div>
        <div className="">quantité</div>
        <div>prix</div>
      </div>
      <div className="flex flex-col mx-10 gap-8">
        {orders?.map((o) => (
          <OrderCard
            prodName={o.product_name}
            quantity={o.quantity}
            price={o.total_price}
          />
        ))}
      </div>
    </div>
  );
}
