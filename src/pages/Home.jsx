import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import HighlightedText from "../components/core/HomePage/HighlightedText";
import CtaButton from "../components/core/HomePage/CtaButton";
import banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineData from "../data/TimelineData";
import Line3 from "../assets/Images/Line3.png";
import TimeLineImage from "../assets/Images/TimelineImage.png";
import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import { RiTwitterXLine } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";

const Home = () => {
  return (
    <>
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
            <div className="absolute top-0 left-[50%] bg-transparent rounded-[50%] h-56 w-[70%] shadow-[0_-10px_40px_rgba(126,198,255,0.6)] translate-x-[-55%]"></div>
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
            ctaBtn2={{ active: false, linkto: "/login", content: "Learn More" }}
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
            ctaBtn2={{ active: false, linkto: "/login", content: "Learn More" }}
            codeBlock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<linkrel="stylesheet"\nhref="styles.css">\n</head>\n<body>\n<h1><a href="/">Link</a></h1>\n<nav>\n<a href="/one">One</a>\n<ahref="/two">Two</<a>\n</nav>`}
            codeColor="#4ca5ed"
            bgGradient="blue"
            position="flex-col md:flex-row-reverse"
          />
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
          <div className="container mx-auto py-10">
            {/* subsection 2 */}
            <div className="w-11/12 mx-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-0 mt-10">
              {/* left side */}
              <div className="w-full sm:w-1/2 text-4xl pr-0 sm:pr-5 font-semi-bold text-center sm:text-start">
                <span>Get the skills you need for a</span>
                <br />
                <span>
                  <HighlightedText>job that is in demand</HighlightedText>
                </span>
              </div>
              {/* right side */}
              <div className="w-full sm:w-1/2 pr-5 sm:pr-5 text-center sm:text-start">
                <p className="mb-6">
                  The modern StudyNotion is the dictates its own terms. Today, to
                  be a competitive specialist requires more than professional
                  skills.
                </p>
                <CtaButton linkto="/login" active={true}>
                  Learn More
                </CtaButton>
              </div>
            </div>
            {/* subsection 3 */}
            <div className="w-11/12 mx-auto flex flex-col sm:flex-row items-center gap-16 sm:gap-0 mt-16">
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
                <div
                  className="absolute left-[50%] top-[50%] bg-transparent rounded-[50%] h-[70%] w-[90%] shadow-[0_0_40px_40px_rgba(126,198,255,0.6)] translate-x-[-50%] translate-y-[-50%]"
                ></div>
                <img
                  src={TimeLineImage}
                  alt="TimeLineImage"
                  className="w-full sm:w-[90%] mx-auto shadow-[10px_10px_0_0_rgba(255,255,255,1)] relative z-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* section 3 */}
        <section></section>

        {/* footer */}
        <section>

        </section>
      </main>
      <footer className="w-screen bg-richblack-800 text-richblack-200 py-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Company Section */}
                <div className="space-y-6">
                  <div className="flex items-center">
                    <span className="text-white text-xl font-semibold">StudyNotion</span>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold">Company</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="#" className="hover:text-white transition-colors">
                          About
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="hover:text-white transition-colors">
                          Careers
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="hover:text-white transition-colors">
                          Affiliates
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="flex space-x-4">
                    <Link href="#" className="hover:text-white transition-colors">
                      <FaFacebook size={20} />
                    </Link>
                    <Link href="#" className="hover:text-white transition-colors">
                      <AiFillGoogleCircle size={20} />
                    </Link>
                    <Link href="#" className="hover:text-white transition-colors">
                      <RiTwitterXLine size={20} />
                    </Link>
                    <Link href="#" className="hover:text-white transition-colors">
                      <FaYoutube size={20} />
                    </Link>
                  </div>
                </div>
                {/* Resources Section */}
                <div className="space-y-6">
                  <h3 className="text-white font-semibold">Resources</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="hover:text-white transition-colors">
                        Articles
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white transition-colors">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white transition-colors">
                        Chart Sheet
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white transition-colors">
                        Code challenges
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white transition-colors">
                        Docs
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white transition-colors">
                        Projects
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white transition-colors">
                        Videos
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white transition-colors">
                        Workspaces
                      </Link>
                    </li>
                  </ul>
                  <div className="pt-4">
                    <h3 className="text-white font-semibold">Support</h3>
                    <ul className="mt-2">
                      <li>
                        <Link href="#" className="hover:text-white transition-colors">
                          Help Center
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Plans & Community Section */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-semibold">Plans</h3>
                    <ul className="mt-2 space-y-2">
                      <li>
                        <Link href="#" className="hover:text-white transition-colors">
                          Paid memberships
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="hover:text-white transition-colors">
                          For students
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="hover:text-white transition-colors">
                          Business solutions
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Community</h3>
                    <ul className="mt-2 space-y-2">
                      <li>
                        <Link href="#" className="hover:text-white transition-colors">
                          Forums
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="hover:text-white transition-colors">
                          Chapters
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="hover:text-white transition-colors">
                          Events
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms
              </Link>
            </div>
            <div className="text-sm">Made with ❤️ CodeHelp © 2023 Studynotion</div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
