import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav>
            <h2>Friend App</h2>
            {user ? (
                <>
                    <span>Welcome, {user.username}!</span>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </nav>
    );
};

export default Navbar;
