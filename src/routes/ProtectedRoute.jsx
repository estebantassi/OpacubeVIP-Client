import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

function Protectedroute() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/login");
    }, []);

    return ( user && <> <Navbar /> <Outlet /> </> );
}

export default Protectedroute;