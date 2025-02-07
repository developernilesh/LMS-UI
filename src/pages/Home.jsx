import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import HighlightedText from "../components/core/HomePage/HighlightedText";
import CtaButton from "../components/core/HomePage/CtaButton";
import banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";

const Home = () => {
  return (
    <main className="w-screen min-h-screen bg-richblack-900 font-inter">
      {/* section 1 */}
      <section className="container mx-auto flex flex-col items-center gap-4 text-white py-10">
        <Link to={"/login"}>
          <div className="bg-richblack-800 text-richblack-200 font-bold rounded-full flex items-center gap-2 px-5 py-2 mt-4 transition-all duration-200 hover:scale-95 hover:bg-richblack-700 border-b-2 border-richblack-500">
            <p>Become an Instructor</p>
            <FaArrowRight />
          </div>
        </Link>

        <h1 className="text-4xl font-semi-bold mt-4 text-center">
          <span>Empower Your Future with</span>&nbsp;
          <HighlightedText>Coding Skills</HighlightedText>
        </h1>

        <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[65%] text-center text-base font-medium text-richblack-200">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex gap-6 mt-2">
          <CtaButton active={true} linkto="/login">
            Learn More
          </CtaButton>
          <CtaButton linkto="/login">Book a Demo</CtaButton>
        </div>

        <div className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto mt-10 relative">
          {/* Background shadow div (z-index: -1 to place it behind the video) */}
          <div className="absolute top-0 left-[50%] bg-transparent rounded-[50%] h-56 w-[70%] shadow-[0_-10px_40px_rgba(126,198,255,0.6)] translate-x-[-55%]"></div>
          {/* <div className="absolute left-0 top-[15%] bg-transparent rounded-[50%] w-56 h-[70%] shadow-[-5px_0_40px_rgba(126,198,255,0.6)]"></div> */}

          {/* Video */}
          <video
            src={banner}
            muted
            loop
            autoPlay
            type="video/mp4"
            className="ml-[-5px] shadow-[10px_10px_0_0_rgba(255,255,255,1)] relative z-10"
          ></video>
        </div>

        <CodeBlocks
          heading={<>
            <span>Unlock your</span>&nbsp;
            <HighlightedText>coding potential</HighlightedText><br />
            <span>with our online courses.</span>
          </>}
          subHeading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          ctaBtn1={
            { active: true, linkto: '/login', content: "Try it Yourself" }
          }
          ctaBtn2={
            { active: false, linkto: '/login', content: "Learn More" }
          }
          codeBlock={
            `<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<linkrel="stylesheet"\nhref="styles.css">\n</head>\n<body>\n<h1><a href="/">Link</a></h1>\n<nav>\n<a href="/one">One</a>\n<ahref="/two">Two</<a>\n</nav>`
          }
          codeColor='#eb387d'
          bgGradient='orange'
        />

        <CodeBlocks
          heading={<>
            <span>Start</span>&nbsp;
            <HighlightedText>coding in seconds.</HighlightedText>&nbsp;
          </>}
          subHeading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          ctaBtn1={
            { active: true, linkto: '/login', content: "Continue Lesson" }
          }
          ctaBtn2={
            { active: false, linkto: '/login', content: "Learn More" }
          }
          codeBlock={
            `<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<linkrel="stylesheet"\nhref="styles.css">\n</head>\n<body>\n<h1><a href="/">Link</a></h1>\n<nav>\n<a href="/one">One</a>\n<ahref="/two">Two</<a>\n</nav>`
          }
          codeColor='#4ca5ed'
          bgGradient='blue'
          position="flex-col md:flex-row-reverse"
        />

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
