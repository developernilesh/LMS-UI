import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { tokenExpiresIn } = useSelector((state) => state.auth);

  if (tokenExpiresIn && Date.now() < Number(tokenExpiresIn)) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
