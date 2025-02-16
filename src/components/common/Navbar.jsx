import React from "react";
import Logo from "../../assets/Logo/MainLogo.png";
import { Link, useParams } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";

const Navbar = () => {
  const param = useParams();
  return (
    <div className="container mx-auto py-2">
      <div className="w-11/12 mx-auto flex justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-32" />
        </Link>
        <div>
          <ul className="flex items-center gap-8">
            {NavbarLinks.map((item, index) => (
              <li
                className={`${
                  param === item.path
                    ? "text-yellow-50"
                    : "text-richblack-25 hover:text-richblack-100"
                } transition-colors`}
              >
                {!item.path ? (
                  <div>{item.title}</div>
                ) : (
                  <Link to={item.path}>{item.title}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
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
