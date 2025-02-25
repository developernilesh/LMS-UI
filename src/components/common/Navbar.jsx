import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo/MainLogo.png";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useDispatch, useSelector } from "react-redux";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import apiConnector from "../../services/apiConnector";
import endpoints from "../../services/apiEndpoints";
import toast from "react-hot-toast";
import { IoIosArrowDown } from "react-icons/io";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { setLoading } from "../../redux/slices/loaderSlice";

const Navbar = () => {
  // getting the token, cartItems, user from the redux store
  const { token } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  // matching the route with the current path
  const location = useLocation();
  const matchRoute = (route) => {
    if (!route) return false;
    return matchPath({ path: route }, location.pathname);
  };

  const [categories, setCategories] = useState([]);

  const fetchAllCategories = async () => {
    try {
      dispatch(setLoading(true));
      const { data } = await apiConnector("GET", endpoints.VIEW_ALL_CATEGORIES);
      if (data?.success) {
        setCategories(data.data);
      } else {
        setCategories([]);
        throw new Error(data?.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <div className="container mx-auto py-2">
      <div className="w-11/12 mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-32" />
        </Link>

        {/* Navbar Links */}
        <ul className="hidden sm:flex items-center gap-4 lg:gap-8">
          {NavbarLinks.map((item, index) => (
            <li
              key={index}
              className={`${
                matchRoute(item?.path)
                  ? "text-yellow-50"
                  : "text-richblack-25 hover:text-richblack-100"
              } transition-colors`}
            >
              {item.path ? (
                <Link to={item.path}>{item.title}</Link>
              ) : (
                <div className="relative group">
                  <div className="flex items-center gap-2">
                    <span>{item.title}</span>
                    <IoIosArrowDown />
                  </div>
                  <div className="h-2 w-2 bg-richblack-5 absolute hidden group-hover:block right-[15%] rotate-45"></div>
                  <div className="absolute hidden group-hover:block bg-richblack-5 text-richblack-900 py-2 px-4 rounded-md shadow-md left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap">
                    <ul className="flex flex-col gap-2">
                      {categories.map((category) => (
                        <li key={category._id}>
                          <Link to={`/catalog/${category.name.split(" ").join("-")}`}>
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Items based on the user's authentication status */}
        <div className="flex items-center gap-2 md:gap-4">
          {token ? (
            <>
              {/* Search Icon */}
              <button className="flex items-center justify-center">
                <IoSearchOutline className="text-richblack-25 text-2xl" />
              </button>

              {/* Cart Icon */}
              {user?.accountType === "Student" && (
                <button className="flex items-center justify-center relative">
                  <IoCartOutline className="text-richblack-25 text-2xl" />
                  <span className="absolute top-[-10%] right-[-20%] bg-pink-500 text-richblack-25 text-sm w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {cartItems.length ? cartItems.length : 0}
                  </span>
                </button>
              )}

              {/* User Avatar */}
              {!user && <ProfileDropdown />}
            </>
          ) : (
            <>
              {/* Login Button */}
              <Link to="/login">
                <button className="bg-richblack-800 text-richblack-25 px-3 py-1 rounded-md border border-richblack-700 hover:bg-richblack-900 hover:scale-95 transition-all duration-200 ease-linear">
                  Login
                </button>
              </Link>

              {/* Signup Button */}
              <Link to="/signup">
                <button className="bg-richblack-800 text-richblack-25 px-3 py-1 rounded-md border border-richblack-700 hover:bg-richblack-900 hover:scale-95 transition-all duration-200 ease-linear">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
