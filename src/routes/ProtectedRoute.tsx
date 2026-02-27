import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext.js";
import { useEffect } from "react";
import Anyroute from "./AnyRoute.js";

function Protectedroute() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/login");
    }, []);

    return ( user && <Anyroute/> );
}

export default Protectedroute;