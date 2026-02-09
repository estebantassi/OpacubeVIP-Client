import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {

  const { user } = useAuth();

  return (
    <>
    <nav>
      <NavLink to="/home">Home</NavLink>
      {!user && <NavLink to="/login">Login</NavLink>}
      {user && <NavLink to="/profile">Profile</NavLink>}
      {user && <NavLink to="/logout">Logout</NavLink>}
      {user && <NavLink to="/accountsettings">Account Settings</NavLink>}
    </nav>
    </>
  );
}

export default Navbar;