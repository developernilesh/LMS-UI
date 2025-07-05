import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { setUser } from "../redux/slices/profileSLice";

const ProtectedRoute = ({ children }) => {
  const { tokenExpiresIn } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (tokenExpiresIn && Date.now() > Number(tokenExpiresIn)) {
      dispatch(setUser(null));
      localStorage.removeItem("tokenExpiresIn");
      localStorage.removeItem("token");
    }
  }, [location.pathname]);

  if (tokenExpiresIn && Date.now() < Number(tokenExpiresIn)) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
