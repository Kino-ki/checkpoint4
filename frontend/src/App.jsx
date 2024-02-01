import "./tailwind.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

export default function App() {
  const [auth, setAuth] = useState();
  // console.log(auth);
  return (
    <div className="bg-gradient-to-br from-yellowsanta min-h-screen pb-10">
      <NavBar auth={auth} setAuth={setAuth} />
      <Outlet context={{ auth, setAuth }} />
    </div>
  );
}
