import { useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CartCard from "../../components/CartCard";

export default function SantaListPage() {
  const [cart, setCart] = useState();
  const [update, setUpdate] = useState(false);
  const [mounted, setMounted] = useState(true);
  const { auth } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (update || mounted) {
      if (auth) {
        axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/api/carts/usercart`, {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          })
          .then((res) => {
            setCart(res.data);
          });
      } else {
        navigate("/profil/connexion");
      }

      setUpdate(false);
      setMounted(false);
    }
  }, [update, mounted]);

  return (
    <div>
      <div className=" flex flex-row justify-center text-8xl font-semibold mt-14">
        <p className="font-medium text-9xl -mt-10 mr-10 hover:animate-spin hover:text-redsanta ">
          {" "}
          M{" "}
        </p>
        <p className="hover:animate-ping hover:text-redsanta">c</p>
        <p className="hover:animate-ping hover:text-greensanta">a</p>{" "}
        <p className="hover:animate-ping hover:text-redsanta">d</p>{" "}
        <p className="hover:animate-ping hover:text-greensanta">e</p>{" "}
        <p className="hover:animate-ping hover:text-redsanta">a</p>
        <p className="hover:animate-ping hover:text-greensanta">u</p>
        <p className="hover:animate-ping hover:text-redsanta">x</p>{" "}
        <p className="font-medium text-9xl -mt-10 ml-10 hover:animate-spin hover:text-greensanta">
          {" "}
          M{" "}
        </p>
      </div>
      <div className="px-60 my-16 ">
        <div className="flex flex-row justify-between px-10 font-heading text-4xl mt-20 mb-5  underline underline-offset-2 decoration-dotted decoration-greensanta ">
          <div>nom</div>
          <div>quantité</div>
        </div>
        <div className="flex flex-col gap-8">
          {cart?.length ? (
            cart
              .filter((c) => c.is_ordered === 0)
              .map((c) => (
                <CartCard
                  key={c.username}
                  id={c.id}
                  name={c.product_name}
                  cartquantity={parseInt(c.cart_quantity, 10)}
                  stockItems={c.product_quantity}
                  userId={c.user_id}
                  prodId={c.product_id}
                  setUpdate={setUpdate}
                  update={update}
                />
              ))
          ) : (
            <div> Panier vide </div>
          )}
        </div>
      </div>
    </div>
  );
}
