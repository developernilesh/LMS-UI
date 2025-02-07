import React from "react";
import CtaButton from "./CtaButton";
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position = 'flex-col md:flex-row', heading, subHeading, ctaBtn1, ctaBtn2, codeBlock, bgGradient, codeColor
}) => {
  return (
    <div className={`flex ${position} justify-center items-center my-20 gap-16 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto`}>
      {/* section1 */}
      <div className="w-full md:w-[50%] flex flex-col items-start gap-4">
        <h2 className="text-4xl font-semi-bold">
          {heading}
        </h2>

        <div className="text-base font-medium text-richblack-200">
          {subHeading}
        </div>

        <div className="flex gap-6 mt-2">
          <CtaButton active={ctaBtn1.active} linkto={ctaBtn1.linkto}>
            <div className="flex items-center gap-2">
              <span>{ctaBtn1.content}</span>
              <span><FaArrowRight /></span>
            </div>
          </CtaButton>
          <CtaButton active={ctaBtn2.active} linkto={ctaBtn2.linkto}>
            {ctaBtn2.content}
          </CtaButton>
        </div>
      </div>

      {/* section 2 */}
      <div className="w-full md:w-[50%] bg-richblack-100/5">
        <div className="flex justify-start border-2 border-richblack-100/15 rounded-md py-4">
          <div className="px-2 flex flex-col items-center text-richblack-400 font-inter">
            <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p>
          </div>
          <div className={`flex flex-col gap-2 items-start ${codeColor}`}>
            <TypeAnimation
              sequence={[codeBlock, 1000, ""]}
              repeat={Infinity}
              style={{
                whiteSpace: "pre-line",
                fontFamily: "Menlo, Monaco, 'Courier New', monospace",
                fontSize: "16px",
                color: "#c5c8c6", // Text color in VS Code theme
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Box shadow in VS Code theme
              }}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
