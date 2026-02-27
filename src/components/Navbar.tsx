import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext.js";

function Navbar() {

    const { user } = useAuth();

    const active = "bg-accent opacity-75";

    return (
        <>
            <nav className={`bg-content flex justify-center [&>*]:font-bold [&>*]:p-4 [&>*:hover]:bg-accent  [&>*]:transition-colors`}>
                {/* Always */}
                <NavLink className={({isActive})=>isActive?active:''} to="/home">Home</NavLink>

                {/* Not logged in */}
                {!user && <NavLink className={({isActive})=>isActive?active:''} to="/login">Login</NavLink>}
                {!user && <NavLink className={({isActive})=>isActive?active:''} to="/signup">Signup</NavLink>}

                {/* Logged in */}
                {user && <NavLink className={({isActive})=>isActive?active:''} to="/profile">Profile</NavLink>}
                {user && <NavLink className={({isActive})=>isActive?active:''} to="/logout">Logout</NavLink>}
                {user && <NavLink className={({isActive})=>isActive?active:''} to="/accountsettings">Account Settings</NavLink>}

            </nav>
        </>
    );
}

export default Navbar;