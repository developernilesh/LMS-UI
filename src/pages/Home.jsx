import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import HighlightedText from "../components/core/HomePage/HighlightedText";
import CtaButton from "../components/core/HomePage/CtaButton";
import banner from "../assets/Images/banner.mp4";

const Home = () => {
  return (
    <main className="w-screen min-h-screen bg-richblack-900 font-inter">
      {/* section 1 */}
      <section className="relative container mx-auto flex flex-col items-center gap-4 text-white py-10">
        <Link to={"/signup"}>
          <div className="bg-richblack-800 text-richblack-200 font-bold rounded-full flex items-center gap-2 px-5 py-2 mt-4 transition-all duration-200 hover:scale-95 hover:bg-richblack-700 border-b-2 border-richblack-500">
            <p>Become an Instructor</p>
            <FaArrowRight />
          </div>
        </Link>

        <h1 className="text-4xl font-semi-bold mt-4 text-center">
          <span>Empower Your Future with</span>&nbsp;
          <HighlightedText text={"Coding Skills"} />
        </h1>

        <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[65%] text-center text-base font-medium text-richblack-200">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex gap-9 mt-2">
          <CtaButton active={true} linkto="/signup">
            Learn More
          </CtaButton>
          <CtaButton linkto="/login">Book a Demo</CtaButton>
        </div>

        <div className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto mt-10">
          <video
            src={banner}
            muted
            loop
            autoPlay
            type="video/mp4"
            className="ml-[-5px] shadow-[10px_10px_0_0_rgba(255,255,255,1)]"
          ></video>
        </div>
      </section>

      {/* section 2 */}
      <section></section>

      {/* section 3 */}
      <section></section>

      {/* footer */}
      <section></section>
    </main>
  );
};

export default Home;
