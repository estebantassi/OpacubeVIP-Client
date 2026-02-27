import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext.js";
import { useEffect } from "react";
import Anyroute from "./AnyRoute.js";

function Unprotectedroute() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/home");
    }, []);

    return ( !user && <Anyroute/> );
}

export default Unprotectedroute;