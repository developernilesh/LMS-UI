import React from "react";
import signupImage from "../assets/Images/signup.webp"
import Template from "../components/core/Auth/Template";

const Signup = () => {
  return (
    <div className="container mx-auto">
      <Template
        title=""
        desc1=""
        desc2=""
        formType="signup"
        image={signupImage}
      />
    </div>
  );
}

export default Signup;