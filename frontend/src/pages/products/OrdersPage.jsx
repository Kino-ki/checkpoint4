import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import OrderCard from "../../components/Products/OrderCard";

export default function OrdersPage() {
  const { auth } = useOutletContext();
  const navigate = useNavigate();
  const [order, setOrder] = useState();

  useEffect(() => {
    if (!auth) {
      navigate("/produits");
    }
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/user/`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      })
      .then((res) => setOrder(res.data));
  }, []);

  return (
    <div className="">
      <div className=" flex flex-row justify-center text-6xl lg:text-8xl font-semibold mt-4 lg:mt-14">
        <p className="font-medium text-9xl lg:text-9xl -mt-10 lg:mr-10 hover:animate-spin hover:text-redsanta ">
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
        <p className="font-medium text-9xl -mt-10 lg:ml-10 hover:animate-spin hover:text-greensanta">
          {" "}
          B{" "}
        </p>
      </div>
      <div className="flex flex-row lg:mx-10 justify-between px-10 font-heading text-4xl mt-10 lg:mt-20 mb-5  underline underline-offset-2 decoration-dotted decoration-greensanta ">
        <div>nom</div>
        <div className="">quantité</div>
        <div>prix</div>
      </div>
      <div className="flex flex-col lg:mx-10 gap-8">
        {order?.length ? (
          order.map((o) => (
            <OrderCard
              prodName={o.product_name}
              quantity={o.quantity}
              price={o.total_price}
            />
          ))
        ) : (
          <div className="flex flex-row justify-center lg:text-9xl text-earthsanta ">
            {" "}
            coucou EI{" "}
          </div>
        )}
      </div>
    </div>
  );
}
