import React from "react";
import loginImage from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template";

const Login = ({ setIsloggedin }) => {
  return (
    <div className="container mx-auto">
      <Template
        title="Welcome Back"
        desc1="Build skills for today, tomorrow, and beyond."
        desc2="Education to future-proof your career."
        formType="login"
        image={loginImage}
        setIsloggedin={setIsloggedin}
      />
    </div>
  );
}

export default Login;