import React from "react";
import loginImage from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template";

const Login = () => {
  return (
    <div className="container mx-auto">
      <Template formType="login" image={loginImage} />
    </div>
  );
}

export default Login;