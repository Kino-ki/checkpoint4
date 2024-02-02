import { useOutletContext, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ExpediteCard from "../../components/Products/ExpediteCard";

export default function ExpeditePage() {
  const { auth } = useOutletContext();
  const navigate = useNavigate();
  const [orders, setOrders] = useState();
  useEffect(() => {
    if (!auth) {
      navigate("/profil/connexion");
    }
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`)
      .then((res) => setOrders(res.data));
  }, []);
  return (
    <div className="flex flex-wrap gap-10 p-10">
      {orders?.map((o) => (
        <ExpediteCard
          adress={o.adress}
          firstname={o.firstname}
          lastname={o.lastname}
          product={o.product_name}
          quantity={o.quantity}
        />
      ))}
    </div>
  );
}
