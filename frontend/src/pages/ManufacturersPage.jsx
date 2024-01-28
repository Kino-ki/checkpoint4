import { useLoaderData } from "react-router-dom";
import ManufacturerList from "../components/Manufacturers/ManufacturerList";

export default function ManufacturersPage() {
  const manufdata = useLoaderData();
  return (
    <div className="">
      {manufdata && <ManufacturerList dbmanuf={manufdata} />}
    </div>
  );
}
