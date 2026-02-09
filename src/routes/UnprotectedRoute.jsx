import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

function Unprotectedroute() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/home");
    }, []);

    return ( !user && <> <Navbar /> <Outlet /> </> );
}

export default Unprotectedroute;