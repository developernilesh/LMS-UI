import React from "react";
import signupImage from "../assets/Images/signup.webp"
import Template from "../components/core/Auth/Template";

const Signup = ({ setIsloggedin }) => {
  return (
    <div className="container mx-auto">
      <Template
        title="Join the millions learning to code with StudyNotion for free"
        desc1="Build skilld for today, tomorrow, and beyond."
        desc2="Education to future-proof your career"
        formType="signup"
        image={signupImage}
        setIsloggedin={setIsloggedin}
      />
    </div>
  );
}

export default Signup;