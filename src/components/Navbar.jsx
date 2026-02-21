import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {

    const { user } = useAuth();

    return (
        <>
            <nav className={`bg-content flex justify-center [&>*]:p-4 [&>*:hover]:bg-accent  [&>*]:transition-colors`}>
                <NavLink   className={({ isActive }) =>
                    isActive ? "text-blue-500 font-bold" : ""
                } to="/home">Home</NavLink>
                {!user && <NavLink to="/login">Login</NavLink>}
                {!user && <NavLink to="/signup">Signup</NavLink>}

                {user && <NavLink to="/profile">Profile</NavLink>}
                {user && <NavLink to="/logout">Logout</NavLink>}
                {user && <NavLink to="/accountsettings">Account Settings</NavLink>}
            </nav>
        </>
    );
}

export default Navbar;