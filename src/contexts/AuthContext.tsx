import { createContext, use, useEffect, useState, type ReactNode } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import axios, { getErrorMessage } from "../api/Axios.js";
import { useToast } from "./ToastContext.js";
import type { User } from "../types/types.js";
import { blobToBase64 } from "../helpers/Tools.js";
import { getSecure } from "../env.js";

type AuthContextType = {
    user: User | null;
    avatar: string | null;
    setAvatar: React.Dispatch<React.SetStateAction<string | null>>;
    IsAuthenticated: () => Promise<boolean>;
    UpdateUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const cookie = Cookies.get("user");
        if (!cookie) return null;
        try { return JSON.parse(cookie) as User; } catch { return null; }
    });
    const [avatar, setAvatar] = useState<string | null>(() => { return localStorage.getItem("avatar"); });

    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { AddToast } = useToast();

    useEffect(() => {
        const status = searchParams.get("oauth");

        if (status == 'success') {
            const data = searchParams.get("data");
            if (!data) {
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

    const UpdateUser = async (newUser: User | null) => {
        setUser(newUser);

        if (newUser) {
            Cookies.set("user", JSON.stringify(newUser), {
                expires: 7,
                secure: getSecure(),
                sameSite: "Strict",
            });

            if (!avatar) {
                try {
                    const request = await axios.get('/getuserprofile?uuid=' + newUser.uuid);
                    const avatarResponse = await axios.get(request.data.data.avatar, { responseType: "blob" });
                    const avatarBase64 = await blobToBase64(avatarResponse.data);

                    setAvatar(avatarBase64);
                    localStorage.setItem("avatar", avatarBase64);
                } catch (err) {
                    AddToast(getErrorMessage(err), "error");
                }
            }
        } else {
            try {
                await axios.post('/auth/refresh/logout', {
                    withCredentials: true
                });
            } catch (err) { console.error(err); }

            localStorage.removeItem("avatar");
            Cookies.remove("user");
            navigate("/home");
            AddToast("You have been logged out", "info");
        }
    };

    const IsAuthenticated = async () => {
        if (!user) return false;

        try {
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
        } catch (err) {
            if (err) console.error(err);
            UpdateUser(null);
            return false;
        };
    };

    return (
        <AuthContext value={{
            user,
            avatar,
            setAvatar,
            IsAuthenticated,
            UpdateUser
        }}>
            {children}
        </AuthContext>
    );
};

export function useAuth() {
  const context = use(AuthContext);
  if (!context) { throw new Error("useAuth must be used inside AuthProvider"); }
  return context;
}