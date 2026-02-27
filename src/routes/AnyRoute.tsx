import { Outlet } from "react-router";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";

function Anyroute() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Anyroute;