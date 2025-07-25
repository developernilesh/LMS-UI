import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo/MainLogo.png";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useDispatch, useSelector } from "react-redux";
import {
  IoCartOutline,
  IoSearchOutline,
  IoMenu,
  IoClose,
} from "react-icons/io5";
import apiConnector from "../../services/apiConnector";
import endpoints from "../../services/apiEndpoints";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { setLoading } from "../../redux/slices/loaderSlice";
import { setUser } from "../../redux/slices/profileSLice";
import { setCategories } from "../../redux/slices/courseSlice";
import { setCartItems } from "../../redux/slices/cartSlice";
import { handleError } from "../../services/operations/handleError";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, tokenExpiresIn } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { cartItems } = useSelector((state) => state.cart);
  const { categories } = useSelector((state) => state.course);

  const {
    VIEW_ALL_CATEGORIES_API,
    USER_DETAILS_API,
    GET_CART_ITEMS_API,
    VIEW_ALL_COURSES_API,
  } = endpoints;

  // matching the route with the current path
  const location = useLocation();
  const matchRoute = (route) => {
    if (!route) return false;
    return matchPath({ path: route }, location.pathname);
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarCatalogOpenInMobile, setIsNavbarCatalogOpenInMobile] =
    useState(false);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showDesktopSearch, setShowDesktopSearch] = useState(false);
  const [searchedCourses, setSearchedCourses] = useState([]);

  const goToTheCourse = (course) => {
    setSearchQuery("");
    setShowMobileSearch(false);
    setShowDesktopSearch(false);
    setSearchedCourses([]);
    navigate(`/course/${course._id}`);
  };

  const fetchAllCategories = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", VIEW_ALL_CATEGORIES_API);
      if (response?.data?.success) {
        dispatch(
          setCategories([
            { name: "All", description: "All Courses" },
            ...response.data.data,
          ])
        );
      }
    } catch (error) {
      dispatch(handleError(navigate, error, false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchUserDetails = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });
      if (response?.data?.success) {
        dispatch(setUser(response.data.data));
        response.data.data.accountType === "Student" && fetchCartItems();
      }
    } catch (error) {
      dispatch(handleError(navigate, error, false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchCartItems = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_CART_ITEMS_API, null, {
        Authorization: `Bearer ${token}`,
      });
      if (response?.data?.success) {
        dispatch(setCartItems(response.data.data));
      }
    } catch (error) {
      dispatch(handleError(navigate, error, false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchAllCourses = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", VIEW_ALL_COURSES_API);
      if (response?.data?.success) {
        setCourses(response.data.data?.allCourses);
      }
    } catch (error) {
      dispatch(handleError(navigate, error, false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchAllCategories();
    fetchAllCourses();
  }, []);

  useEffect(() => {
    if (tokenExpiresIn && Date.now() < Number(tokenExpiresIn))
      fetchUserDetails();
  }, [tokenExpiresIn]);

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchedCourses([]);
      return;
    }
    setSearchedCourses(
      courses.filter(
        (course) =>
          course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.courseDescription
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  return (
    <div className="w-11/12 mx-auto h-12 flex items-center">
      <div className="w-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-32" />
        </Link>

        {/* Navbar Links - Desktop */}
        <ul className="hidden md:flex items-center gap-4 lg:gap-8">
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
                  {categories.length !== 0 && (
                    <>
                      <div className="h-2 w-2 bg-richblack-5 absolute hidden group-hover:block right-[15%] rotate-45 z-50"></div>
                      <div
                        className="absolute hidden group-hover:block bg-richblack-5 text-richblack-900 p-2 rounded-md shadow-md 
                      left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap z-50"
                      >
                        <ul className="flex flex-col gap-2">
                          {categories.map((category, index) => (
                            <li
                              key={index}
                              onClick={() =>
                                navigate(
                                  category?._id
                                    ? `/catalog/${category._id}`
                                    : "all-courses"
                                )
                              }
                              className="bg-richblack-50 hover:bg-richblack-100 px-4 py-1 rounded cursor-pointer"
                            >
                              {category.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Items based on the user's authentication status */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Searchbar - Desktop (moved here) */}
          <div className="hidden md:flex items-center">
            {!showDesktopSearch ? (
              <button
                className="flex items-center justify-center text-richblack-25 text-2xl"
                onClick={() => setShowDesktopSearch(true)}
                aria-label="Open search"
              >
                <IoSearchOutline className="text-xl" />
              </button>
            ) : (
              <div className="relative">
                <div className="flex items-center">
                  <input
                    type="text"
                    className="w-full max-w-56 px-2 lg:px-4 py-1 rounded-l-md bg-richblack-800 text-richblack-25 border border-richblack-600 focus:outline-none text-sm"
                    placeholder="Search for courses, topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <button
                    className="bg-yellow-50 px-2 lg:px-3 py-1 rounded-r-md border border-l-0 border-yellow-50 hover:bg-yellow-100 hover:border-yellow-100 transition-colors"
                    onClick={() => {
                      setShowDesktopSearch(false);
                      setSearchQuery("");
                      setSearchedCourses([]);
                    }}
                    aria-label="Search"
                  >
                    <IoClose className="text-xl text-richblack-800" />
                  </button>
                </div>
                {searchedCourses.length > 0 && (
                  <ul className="absolute w-full mt-1 bg-richblack-700 text-richblack-50 rounded-md z-10 text-sm">
                    {searchedCourses.map((course, index) => (
                      <li
                        key={course.courseId}
                        className={`px-4 py-2 hover:bg-richblack-800 cursor-pointer ${
                          index === 0 ? "rounded-t-md border-y" : "border-b"
                        } ${
                          index === searchedCourses.length - 1
                            ? "rounded-b-md"
                            : ""
                        } border-x border-richblack-600`}
                        onClick={() => goToTheCourse(course)}
                      >
                        {course.courseName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          {/* End Desktop Searchbar */}
          {user ? (
            <>
              {/* Search Icon - Mobile */}
              <button
                className="flex items-center justify-center md:hidden"
                onClick={() => setShowMobileSearch(true)}
              >
                <IoSearchOutline className="text-richblack-25 text-2xl" />
              </button>

              {/* Cart Icon */}
              {user?.accountType === "Student" && (
                <Link to="/dashboard/my-wishlist">
                  <button className="flex items-center justify-center relative">
                    <IoCartOutline className="text-richblack-25 text-2xl" />
                    <span
                      className="absolute top-[-10%] right-[-20%] bg-pink-500 text-richblack-25 text-sm w-4 h-4 rounded-full 
                  flex items-center justify-center animate-bounce"
                    >
                      {cartItems.length ? cartItems.length : 0}
                    </span>
                  </button>
                </Link>
              )}

              {/* User Avatar */}
              <ProfileDropdown user={user} />
            </>
          ) : (
            <>
              {/* Search Icon - Mobile (for unauthenticated users) */}
              <button
                className="flex items-center justify-center md:hidden"
                onClick={() => setShowMobileSearch(true)}
              >
                <IoSearchOutline className="text-richblack-25 text-2xl" />
              </button>

              {/* Login Button */}
              <Link to="/login">
                <button
                  className="bg-richblack-800 text-richblack-25 px-3 py-1 rounded-md border border-richblack-700 
                hover:bg-richblack-900 hover:scale-95 transition-all duration-200 ease-linear"
                >
                  Login
                </button>
              </Link>

              {/* Signup Button */}
              <Link to="/signup">
                <button
                  className="bg-richblack-800 text-richblack-25 px-3 py-1 rounded-md border border-richblack-700 
                hover:bg-richblack-900 hover:scale-95 transition-all duration-200 ease-linear"
                >
                  Signup
                </button>
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-richblack-25 text-2xl ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <IoMenu />
          </button>
        </div>

        {/* Mobile Search Overlay */}
        {showMobileSearch && (
          <div className="fixed inset-0 z-50 bg-richblack-900 flex items-start pt-8 px-4">
            <div className="w-full max-w-lg mx-auto">
              <div className="flex w-full items-center">
                <input
                  type="text"
                  className="w-full px-4 py-1.5 rounded-l-md bg-richblack-800 text-richblack-25 border border-richblack-600 focus:outline-none"
                  placeholder="Search for courses, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button
                  className="bg-yellow-50 text-richblack-900 px-3 py-2 rounded-r-md border border-yellow-50 hover:bg-yellow-100 transition-colors"
                  onClick={() => {
                    setShowMobileSearch(false);
                    setSearchQuery("");
                    setSearchedCourses([]);
                  }}
                  aria-label="Close search"
                >
                  <IoClose className="text-xl" />
                </button>
              </div>
              {searchedCourses.length > 0 && (
                <ul className="w-full mt-3 bg-richblack-700 text-richblack-50 rounded-md z-10">
                  {searchedCourses.map((course, index) => (
                    <li
                      key={course.courseId}
                      className={`px-4 py-2 hover:bg-richblack-800 cursor-pointer ${
                        index === 0 ? "rounded-t-md border-y" : "border-b"
                      } ${
                        index === searchedCourses.length - 1
                          ? "rounded-b-md"
                          : ""
                      } border-x border-richblack-600`}
                      onClick={() => goToTheCourse(course)}
                    >
                      {course.courseName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 h-screen w-full bg-richblack-900 md:hidden z-50">
            <div className="container mx-auto">
              <div className="py-2 w-11/12 mx-auto flex justify-between items-center">
                <Link to="/">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="w-32"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsNavbarCatalogOpenInMobile(false);
                    }}
                  />
                </Link>
                <button
                  className="text-richblack-25 text-2xl"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsNavbarCatalogOpenInMobile(false);
                  }}
                >
                  <IoClose />
                </button>
              </div>
              <ul className="flex flex-col items-center gap-4 w-11/12 mx-auto mt-4">
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
                      <Link to={item.path}>
                        <div
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsNavbarCatalogOpenInMobile(false);
                          }}
                        >
                          {item.title}
                        </div>
                      </Link>
                    ) : (
                      <div className="relative group flex flex-col items-center">
                        <div
                          className="flex items-center gap-2"
                          onClick={() =>
                            setIsNavbarCatalogOpenInMobile(
                              !isNavbarCatalogOpenInMobile
                            )
                          }
                        >
                          <span>{item.title}</span>
                          {isNavbarCatalogOpenInMobile ? (
                            <IoIosArrowUp />
                          ) : (
                            <IoIosArrowDown />
                          )}
                        </div>
                        {categories.length !== 0 &&
                          isNavbarCatalogOpenInMobile && (
                            <div className="bg-richblack-5 text-richblack-900 p-2 mt-2 rounded-md">
                              <ul className="flex flex-col gap-2">
                                {categories.map((category, index) => (
                                  <li
                                    key={index}
                                    onClick={() => {
                                      setIsMenuOpen(false);
                                      setIsNavbarCatalogOpenInMobile(false);
                                      navigate(
                                        category?._id
                                          ? `/catalog/${category._id}`
                                          : "all-courses"
                                      );
                                    }}
                                    className="bg-richblack-50 hover:bg-richblack-100 px-4 py-1 rounded cursor-pointer"
                                  >
                                    {category.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
