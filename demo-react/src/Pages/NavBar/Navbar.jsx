import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    // eslint-disable-next-line no-unused-vars
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Ghuri</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li className=""><NavLink to="/">Home</NavLink></li>
                    {
                        !isLoggedIn ? <li className=""><NavLink to="/login">Login</NavLink></li> : ''
                    }
                    {
                        !isLoggedIn ? <li className=""><NavLink to="/register">Register</NavLink></li> : ''
                    }
                    {
                        isLoggedIn ? <li className=""><NavLink to="/profile">Profile</NavLink> </li> : ''
                    }
                    {
                        !isLoggedIn ? <li className=""><NavLink to="/ocr">Verification OCR</NavLink> </li> : ''
                    }
                    {
                        isLoggedIn ? <li className=""><NavLink to="/logout">Logout</NavLink></li> : ''
                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;