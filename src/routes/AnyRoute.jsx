import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

function Anyroute() {
  return (
    <>
    <Navbar/>
    <Outlet />
    </>
  );
}

export default Anyroute;