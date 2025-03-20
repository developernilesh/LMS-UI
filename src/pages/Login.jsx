import React from "react";
import loginImage from "../assets/Images/login.webp";
import Template from "../components/core/Auth/Template";
import Footer from "../components/common/Footer";

const Login = () => {
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
