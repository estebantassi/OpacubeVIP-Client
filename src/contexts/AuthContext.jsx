import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import axios from "../api/Axios";
import { useToast } from "./ToastContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState((Cookies.get("user") && JSON.parse(Cookies.get("user"))) || null);
    const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || null);

    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { AddToast } = useToast();

    useEffect(() => {
        const status = searchParams.get("oauth");

        if (status == 'success') {
            const data = searchParams.get("data");
            if (!data)
            {
                navigate("/home");
                return AddToast("Error fetching data from URL", "error");
            }
            
            navigate(pathname, { replace: true });
            localStorage.removeItem("avatar");
            UpdateUser(JSON.parse(data));
            AddToast("Successfully logged in", "success");
        } else if (status == 'error') {
            const error = searchParams.get("error");
            navigate(pathname, { replace: true });
            AddToast(error ?? "Unknown error", "error");
        }
    }, []);

    const UpdateUser = async (newUser) => {
        setUser(newUser);

        if (newUser) {
            Cookies.set("user", JSON.stringify(newUser), {
                expires: 7,
                secure: true,
                sameSite: "Strict",
            });

            if (!avatar)
            {
                try {
                    const request = await axios.get('/getuserprofile?uuid=' + newUser.uuid);
                    setAvatar(request.data.data.avatar);
                    localStorage.setItem("avatar", request.data.data.avatar);
                } catch (err) {
                    AddToast(err?.response?.data?.message ?? "Unknown error", "error");
                }
            }
        } else {
            try {
                await axios.post('/auth/refresh/logout', {
                    withCredentials: true
                });
            } catch (err) {}

            localStorage.removeItem("avatar");
            Cookies.remove("user");
            navigate("/home");
            AddToast("You have been logged out", "info");
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
        avatar,
        setAvatar,
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