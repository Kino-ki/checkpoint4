import { useLoaderData } from "react-router-dom";

export default function OrdersPage() {
  const orders = useLoaderData();
  console.log(orders);
}
