import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import HighlightedText from "../components/core/HomePage/HighlightedText";
import CtaButton from "../components/core/HomePage/CtaButton";

const Home = () => {
  return (
    <main className="w-screen min-h-screen bg-richblack-900 font-inter">
      {/* section 1 */}
      <section className="relative container mx-auto flex flex-col items-center text-white border border-richblack-500 py-10">
        <Link to={"/signup"}>
          <div className="bg-richblack-800 text-richblack-200 font-bold rounded-full flex items-center gap-2 px-5 py-2 transition-all duration-200 hover:scale-95 hover:bg-richblack-700 border-b border-richblack-100">
            <p>Become an Instructor</p>
            <FaArrowRight />
          </div>
        </Link>

        <h1 className="text-4xl font-semi-bold">
          <span>Empower Your Future with</span>&nbsp;
          <HighlightedText text={"Coding Skills"} />
        </h1>

        <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] text-center text-base font-medium text-richblack-200">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex gap-9">
          <CtaButton active={true}>Learn More</CtaButton>
          <CtaButton>Book a Demo</CtaButton>
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
