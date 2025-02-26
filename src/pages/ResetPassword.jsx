import React from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { loading } = useSelector((state) => state.loader);
  const {token} = useParams()

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h3>Choose New Password</h3>
      <p>Almost done. Enter your new password and youre all set.</p>
      <div className="text-xl font-semibold">Token: {token}</div>
    </div>
  );
};

export default ResetPassword;
