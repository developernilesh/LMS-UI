import React from "react";
import Logo from "../../assets/Logo/MainLogo.png";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";

const Navbar = () => {
  // getting the token, cartItems, user from the redux store
  const {token} = useSelector(state => state.auth)
  const {cartItems} = useSelector(state => state.cart)
  const {user} = useSelector(state => state.profile)

  // matching the route with the current path
  const location = useLocation();
  const matchRoute = (route) => {
    if (!route) return false;
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="container mx-auto py-2">
      <div className="w-11/12 mx-auto flex justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-32" />
        </Link>
        <ul className="flex items-center gap-8">
          {NavbarLinks.map((item, index) => (
            <li
              key={index}
              className={`${matchRoute(item?.path)
                ? "text-yellow-50"
                : "text-richblack-25 hover:text-richblack-100"
                } transition-colors`}
            >
              {item.path ? (
                <Link to={item.path}>{item.title}</Link>
              ) : (
                <div>{item.title}</div>
              )}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <button className="bg-richblack-800 text-richblack-25 px-3 py-2 rounded-md border border-richblack-700 hover:bg-richblack-900 hover:scale-95 transition-all duration-200 ease-linear">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-richblack-800 text-richblack-25 px-3 py-2 rounded-md border border-richblack-700 hover:bg-richblack-900 hover:scale-95 transition-all duration-200 ease-linear">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
