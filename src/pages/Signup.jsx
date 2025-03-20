import React from "react";
import signupImage from "../assets/Images/signup.webp";
import Template from "../components/core/Auth/Template";
import Footer from "../components/common/Footer";

const Signup = () => {
  return (
    <>
      <div className="container mx-auto">
        <Template
          title=""
          desc1=""
          desc2=""
          formType="signup"
          image={signupImage}
        />
      </div>
      <footer className="w-full bg-richblack-800 text-richblack-200">
        <Footer />
      </footer>
    </>
  );
};

export default Signup;
