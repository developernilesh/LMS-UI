import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import HighlightedText from "../components/core/HomePage/HighlightedText";
import CtaButton from "../components/core/HomePage/CtaButton";
import banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineData from "../data/TimelineData";
import Line3 from "../assets/Images/Line3.png";
import TimeLineImage from "../assets/Images/TimelineImage.png";
import Instructor from "../assets/Images/Instructor.png";
import Know_your_progress from "../assets/Images/Know_your_progress.svg";
import Plan_your_lessons from "../assets/Images/Plan_your_lessons.svg";
import Compare_with_others from "../assets/Images/Compare_with_others.svg";
import { HomePageExplore } from "../data/homepage-explore";
import ExploreMoreCards from "../components/core/HomePage/ExploreMoreCards";
import Footer from "../components/common/Footer";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";

const tabs = HomePageExplore.map((category) => category.tag);

const Home = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const { loading } = useSelector((state) => state.loader);
  const { user } = useSelector((state) => state.profile);

  if (loading) return <Loader />;

  return (
    <>
      <section className="container mx-auto flex flex-col items-center gap-4 text-white pt-10">
        {user ? (
          <Link to={"/dashboard/my-profile"}>
            <div
              className="bg-caribbeangreen-400 text-richblack-25 hover:text-white font-semibold rounded-full flex items-center gap-2 
            px-5 py-2 mt-4 transition-all duration-200 hover:bg-caribbeangreen-300 border-b-2 border-caribbeangreen-600"
            >
              <p>Go To Your Dashboard</p>
              <FaArrowRight />
            </div>
          </Link>
        ) : (
          <Link to={"/signup"}>
            <div
              className="bg-richblack-800 text-richblack-200 font-bold rounded-full flex items-center gap-2 px-5 py-2 mt-4 
            transition-all duration-200 hover:scale-95 hover:bg-richblack-900 border-b-2 hover:border border-richblack-700"
            >
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </Link>
        )}
        <h1 className="text-4xl font-semibold mt-4 text-center">
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
          <div className="absolute top-0 left-[50%] bg-transparent rounded-[50%] h-[70%] w-[70%] shadow-[0_-10px_40px_rgba(126,198,255,0.6)] translate-x-[-55%]"></div>

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
          heading={
            <>
              <span>Unlock your</span>&nbsp;
              <HighlightedText>coding potential</HighlightedText>
              <br />
              <span>with our online courses.</span>
            </>
          }
          subHeading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          ctaBtn1={{
            active: true,
            linkto: "/login",
            content: "Try it Yourself",
          }}
          ctaBtn2={{
            active: false,
            linkto: "/login",
            content: "Learn More",
          }}
          codeBlock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<linkrel="stylesheet"\nhref="styles.css">\n</head>\n<body>\n<h1><a href="/">Link</a></h1>\n<nav>\n<a href="/one">One</a>\n<ahref="/two">Two</<a>\n</nav>`}
          codeColor="#eb387d"
          bgGradient="orange"
        />

        <CodeBlocks
          heading={
            <>
              <span>Start</span>&nbsp;
              <HighlightedText>coding in seconds.</HighlightedText>&nbsp;
            </>
          }
          subHeading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          ctaBtn1={{
            active: true,
            linkto: "/login",
            content: "Continue Lesson",
          }}
          ctaBtn2={{
            active: false,
            linkto: "/login",
            content: "Learn More",
          }}
          codeBlock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<linkrel="stylesheet"\nhref="styles.css">\n</head>\n<body>\n<h1><a href="/">Link</a></h1>\n<nav>\n<a href="/one">One</a>\n<ahref="/two">Two</<a>\n</nav>`}
          codeColor="#4ca5ed"
          bgGradient="blue"
          position="flex-col md:flex-row-reverse"
        />

        <div className="mt-28">
          <h3 className="text-4xl font-semibold text-center">
            <span>Unlock the</span>&nbsp;
            <HighlightedText>Power of Code</HighlightedText>
          </h3>
          <div className="mt-2 text-center">
            Learn to Build Anything You Can Imagine
          </div>
          <div className="flex justify-center mt-6">
            <div className="bg-richblack-800 rounded-full flex gap-4 p-1">
              {tabs.map((item, index) => (
                <span
                  key={index}
                  onClick={() => setCurrentTab(item)}
                  className={`${
                    currentTab === item
                      ? "bg-richblack-900 font-medium text-richblack-5"
                      : "text-richblack-200"
                  } rounded-full py-1 px-3 transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:font-medium hover:text-richblack-5 hover:scale-95`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-9 font-inter mt-12 -mb-14">
            {HomePageExplore.find(
              (item) => item.tag === currentTab
            ).courses.map((course, index) => (
              <ExploreMoreCards data={course} dark={index !== 0} key={index} />
            ))}
          </div>
        </div>
      </section>

      {/* section 2 */}
      <section className="w-screen bg-pure-greys-5 text-richblack-700">
        {/* subsection 1 */}
        <div className="bg-[url('../src/assets/Images/bghome.svg')] h-[318px] flex justify-center items-center gap-6">
          <CtaButton active={true} linkto="/login">
            <div className="flex items-center gap-2">
              <span>Explore Full Catelog</span>
              <span>
                <FaArrowRight />
              </span>
            </div>
          </CtaButton>
          <CtaButton linkto="/login">Learn More</CtaButton>
        </div>
        <div className="container mx-auto mt-16">
          {/* subsection 2 */}
          <div className="w-11/12 mx-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-20">
            {/* left side */}
            <div className="w-full sm:w-1/2 text-4xl font-semibold text-center sm:text-start">
              <span>Get the skills you need for a </span>
              <br />
              <span>
                <HighlightedText>job that is in demand</HighlightedText>
              </span>
            </div>

            {/* right side */}
            <div className="w-full sm:w-1/2 text-center sm:text-start">
              <p className="mb-6">
                The modern LearnVerse is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>
              <CtaButton linkto="/login" active={true}>
                Learn More
              </CtaButton>
            </div>
          </div>

          {/* subsection 3 */}
          <div className="w-11/12 mx-auto flex flex-col sm:flex-row items-center gap-16 sm:gap-0 my-16">
            {/* left side */}
            <div className="w-full sm:w-[40%] pl-0 md:pl-5 flex justify-center sm:justify-start">
              <div className="flex flex-col items-start">
                {TimelineData.map((item, index) => (
                  <div className="flex flex-row gap-6" key={index}>
                    <div>
                      <div className="w-12 h-12 bg-[#FFFFFF] flex justify-center rounded-full p-3 shadow-md">
                        <img src={item.logo} alt={item.heading} />
                      </div>
                      {index !== TimelineData.length - 1 && (
                        <div className="flex justify-center">
                          <img src={Line3} alt="Dots" />
                        </div>
                      )}
                    </div>
                    <div className="font-inter">
                      <h3 className="text-lg font-semibold">{item.heading}</h3>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* right side */}
            <div className="relative w-full sm:w-[60%]">
              <div className="absolute left-[50%] top-[50%] bg-transparent rounded-[50%] h-[70%] w-[90%] shadow-[0_0_40px_40px_rgba(126,198,255,0.6)] translate-x-[-50%] translate-y-[-50%]"></div>
              <img
                src={TimeLineImage}
                alt="TimeLineImage"
                className="w-full sm:w-[90%] mx-auto shadow-[10px_10px_0_0_rgba(255,255,255,1)] relative z-10"
              />
              <div className="absolute bg-caribbeangreen-700 flex flex-col lg:flex-row gap-4 lg:gap-0 text-white uppercase p-10 left-[50%] bottom-0 translate-x-[-50%] translate-y-[50%] z-20">
                <div className="flex gap-5 justify-center items-center w-fit">
                  <div className="text-3xl font-bold">10</div>
                  <div className="text-sm text-caribbeangreen-300">
                    Years of Experience
                  </div>
                </div>
                <div className="border-r border-caribbeangreen-300 mx-2 lg:mx-6 hidden lg:block"></div>
                <div className="flex gap-5 justify-center items-center w-fit">
                  <div className="text-3xl font-bold">250</div>
                  <div className="text-sm text-caribbeangreen-300">
                    Types of Courses
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* subsection 4 */}
          <div className="w-11/12 mx-auto py-20">
            <div className="mt-4 text-center">
              <h3 className="text-4xl font-semibold text-richblack-900">
                <span>Your swiss knife for</span>&nbsp;
                <HighlightedText>learning any language</HighlightedText>
              </h3>
              <p className="mt-3">
                Using spin making learning multiple languages easy. with 20+
                languages realistic voice-over, progress tracking, custom
                schedule and more.
              </p>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center mt-10 lg:mt-4">
              <img
                src={Know_your_progress}
                alt="Know_your_progress"
                className="object-contain"
              />
              <img
                src={Compare_with_others}
                alt="Compare_with_others"
                className="object-contain mx-0 lg:-mx-36 -my-24 lg:my-0"
              />
              <img
                src={Plan_your_lessons}
                alt="Plan_your_lessons"
                className="object-contain"
              />
            </div>
            <div className="flex justify-center mt-4">
              <CtaButton active={true} linkto="/login">
                Learn More
              </CtaButton>
            </div>
          </div>
        </div>
      </section>

      {/* section 3 */}
      <section className="container mx-auto flex flex-col items-center gap-4 text-white py-10">
        {/* sub section 1 */}
        <div
          className={`flex flex-col md:flex-row justify-center items-center my-20 gap-20 w-[90%] sm:w-[85%] mx-auto`}
        >
          {/* left side */}
          <div className="w-full md:w-[50%] lg:w-[50%] bg-transparent relative">
            <div className="absolute left-[50%] top-[50%] bg-transparent rounded-[50%] h-[70%] w-[90%] shadow-[0_0_40px_40px_rgba(126,198,255,0.5)] translate-x-[-50%] translate-y-[-50%]"></div>
            <img
              src={Instructor}
              alt="TimeLineImage"
              className="w-full mx-auto shadow-[-10px_-10px_0_0_rgba(255,255,255,1)] relative z-10"
            />
          </div>

          {/* right side */}
          <div className="w-full md:w-[50%] flex flex-col items-center md:items-start gap-4 z-10">
            <h2 className="text-4xl font-semibold text-center md:text-start">
              <span>Become an</span>&nbsp;
              <span>
                <HighlightedText>Instructor</HighlightedText>
              </span>
            </h2>

            <div className="text-base font-medium text-richblack-200 text-center md:text-start">
              Instructors from around the world teach millions of students on
              LearnVerse. We provide the tools and skills to teach what you
              love.
            </div>

            <div className="flex gap-6 mt-10">
              <CtaButton active={true} linkto="/signup">
                <div className="flex items-center gap-2">
                  <span>Start Teaching Today</span>
                  <span>
                    <FaArrowRight />
                  </span>
                </div>
              </CtaButton>
            </div>
          </div>
        </div>
        {/* sub section 2 */}
      </section>
      <footer className="w-full bg-richblack-800 text-richblack-200">
        <Footer />
      </footer>
    </>
  );
};

export default Home;
