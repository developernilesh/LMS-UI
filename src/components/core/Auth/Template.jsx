import React from "react";
import frameImg from "../../../assets/Images/frame.png";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const Template = ({ title, desc1, desc2, image, formType }) => {
  return (
    <div className="flex flex-col md:flex-row gap-20 w-11/12 mx-auto py-12">
      <div className="w-full md:w-1/2">
        <div className="max-w-[508px] ml-auto ">
          {formType === "signup" ? <SignupForm /> : <LoginForm />}
        </div>
      </div>

      <div className="w-full md:w-1/2 hidden md:block">
        <div className="relative w-11/12 max-w-[500px] mr-auto">
          <img
            src={frameImg}
            alt="pattern"
            loading="lazy"
            className="absolute top-4 left-4"
          />
          <img
            src={image}
            alt="students"
            loading="lazy"
            className="absolute "
          />
        </div>
      </div>
    </div>
  );
};

export default Template;
