import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import axios from "../api/Axios";
import { useToast } from "./ToastContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null);

    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { AddToast } = useToast();

    useEffect(() => {
        const status = searchParams.get("oauth");

        if (status == 'success') {
            navigate(pathname, { replace: true });
            UpdateUser(JSON.parse(Cookies.get("user")));
            AddToast("Successfully logged in", "success");
        } else if (status == 'error') {
            const error = searchParams.get("error");
            AddToast(error ?? "Unknown error", "error");
        }
    }, []);

    const UpdateUser = async (newUser) => {
        setUser(newUser);

        if (!newUser) {
            await axios.post('/auth/refresh/logout', {
                withCredentials: true
            });

            Cookies.remove("user");
            navigate("/home");
            AddToast("You have been logged out", "error");
        }
    };

    const IsAuthenticated = async() => {
        if (!user) return false;

        try{
            let response = await axios.get('/auth/access/check', {
                withCredentials: true
            });

            if (!response.data.authorized) {
                response = await axios.get('/auth/refresh/update', {
                    withCredentials: true
                });

                if (!response.data.authorized) UpdateUser(null);

                return response.data.authorized;
            }

            return true;
        } catch (err)
        {
            UpdateUser(null);
            return false;
        };
    };

    let contextData = {
        user,
        IsAuthenticated,
        UpdateUser
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);