import React from "react";
import CtaButton from "./CtaButton";
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position = 'flex-col md:flex-row', heading, subHeading, ctaBtn1, ctaBtn2, codeBlock, bgGradient, codeColor
}) => {
  return (
    <div className={`flex ${position} justify-center items-center my-20 gap-16 w-[95%] sm:w-[90%] md:w-[85%] mx-auto`}>
      {/* section1 */}
      <div className="w-full md:w-[40%] lg:w-[50%] flex flex-col items-center md:items-start gap-4 z-10">
        <h2 className="text-4xl font-semibold text-center md:text-start">
          {heading}
        </h2>

        <div className="text-base font-medium text-richblack-200 text-center md:text-start">
          {subHeading}
        </div>

        <div className="flex gap-6 mt-10">
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
      <div className="w-full md:w-[60%] lg:w-[50%] bg-transparent relative">
        <div className={`absolute top-[-30%] left-[-30%] rounded-[50%] h-full w-full 
        ${bgGradient=='blue' ? 'bg-[radial-gradient(#0977bc7d,#000814,#000814)]' : 'bg-[radial-gradient(#bc4a0c62,#000814,#000814)]'}`}></div>
        <div className="flex justify-start border-2 border-richblack-200/15 rounded-md py-4 pr-2 relative z-10">
          <div className="px-2 flex flex-col items-center text-richblack-400 font-inter">
            <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>10</p><p>11</p><p>12</p><p>13</p>
          </div>
          <div className={`flex flex-col gap-2 items-start`}>
            <TypeAnimation
              sequence={[codeBlock, 1000, ""]}
              repeat={Infinity}
              style={{
                whiteSpace: "pre-line",
                fontFamily: "Menlo, Monaco, 'Courier New', monospace",
                fontSize: "16px",
                fontWeight: "bold",
                color: `${codeColor}`, // Text color in VS Code theme
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
