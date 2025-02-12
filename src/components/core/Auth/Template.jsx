import React from "react";
import frameImg from "../../../assets/Images/frame.png";
import { FcGoogle } from "react-icons/fc";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const Template = ({ title, desc1, desc2, image, formType, setIsloggedin }) => {
  return (
    <div className="flex flex-col md:flex-row gap-10 w-11/12 mx-auto py-12">
      <div className="w-full">
        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
          {title}
        </h1>

        <p className="flex flex-col text-[1.125rem] leading-[1.625rem] mt-4">
          <span className="text-richblack-100">{desc1}</span>
          <span className="text-blue-100 italic">{desc2}</span>
        </p>

        {formType === "signup" ? (
          <SignupForm setIsloggedin={setIsloggedin} />
        ) : (
          <LoginForm setIsloggedin={setIsloggedin} />
        )}

        {/* <div className="flex w-full items-center my-4 gap-2">
          <div className="w-full h-[1px] bg-richblack-700"></div>
          <p className="font-medium leading-[1.375rem] text-richblack-200">OR</p>
          <div className="w-full h-[1px] bg-richblack-700"></div>
        </div>

        <button className="w-full flex justify-center items-center rounded-[8px] 
                font-medium text-richblack-100 border border-richblack-700 px-[12px] py-[8px] gap-2 mt-6">
          <FcGoogle />
          <p>Signup with Google</p>
        </button> */}
      </div>

      {/* <div className="w-full">
        <div className="w-11/12 mx-auto relative">
          <img
          src={frameImg}
          alt="pattern"
          loading="lazy"
          className="absolute translate-y-[10%]"
        />

          <img
            src={image}
            alt="students"
            loading="lazy"
            className="w-full absolute"
          />
        </div>
      </div> */}
      <div className="w-full hidden md:block">
        <div className="relative w-11/12 max-w-[600px] mx-auto">
          <img src={frameImg} width={558} alt="pattern" loading="lazy"
            className="absolute top-4 left-4" />

          <img src={image} width={558} alt="students" loading="lazy"
            className="absolute " />
        </div>
      </div>
    </div>
  );
};

export default Template;
