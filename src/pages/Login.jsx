import React from "react";
import loginImage from "../assets/Images/login.webp";
import Template from "../components/core/Auth/Template";
import Footer from "../components/common/Footer";
import Loader from "../components/Loader/Loader";
import { useSelector } from "react-redux";

const Login = () => {
  const { loading } = useSelector((state) => state.loader);
  if (loading) return <Loader />;

  return (
    <>
      <div className="container mx-auto">
        <Template formType="login" image={loginImage} />
      </div>
      <footer className="w-full bg-richblack-800 text-richblack-200">
        <Footer />
      </footer>
    </>
  );
};

export default Login;
