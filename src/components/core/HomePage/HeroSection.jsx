import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HighlightedText from "./HighlightedText";
import { FaPlay } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const HeroSection = () => {
  const { user } = useSelector((state) => state.profile);
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900"></div>

        {/* Animated Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-100/20 to-blue-100/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-100/15 to-yellow-100/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-richblue-100/10 to-blue-100/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
          linear-gradient(rgba(6, 214, 160, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6, 214, 160, 0.1) 1px, transparent 1px)
        `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      <div className="min-h-[calc(100vh-48px)] container mx-auto flex items-center py-16 pt-8 relative z-10">
        <div className="w-11/12 mx-auto grid lg:grid-cols-2 gap-12 items-center relative">
          {/* Floating Code Patterns */}
          <div className="absolute top-12 left-32 opacity-0 lg:opacity-30 animate-float">
            <div className="font-mono text-richblack-100 text-sm">
              {'<div className="hero">'}
            </div>
          </div>
          <div className="absolute -top-4 right-72 opacity-0 lg:opacity-30 animate-float delay-300">
            <div className="font-mono text-richblack-100 text-sm">
              {"function learn() {"}
            </div>
          </div>
          <div className="absolute bottom-14 left-64 opacity-0 lg:opacity-30 animate-float delay-700">
            <div className="font-mono text-richblack-100 text-sm">
              {"const skills = [];"}
            </div>
          </div>
          <div className="absolute bottom-0 right-28 opacity-0 lg:opacity-30 animate-float delay-1000">
            <div className="font-mono text-richblack-100 text-sm">
              {"return success;"}
            </div>
          </div>
          <div className="text-center lg:text-left">
            {/* Animated Badge */}
            {user ? (
              <Link to={"/dashboard/my-profile"}>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100/10 to-blue-100/10 border border-blue-100/20 rounded-full px-4 py-2 mb-8 animate-slideInLeft">
                  <div className="w-2 h-2 bg-blue-100 rounded-full animate-ping"></div>
                  <span className="text-blue-100 text-sm font-semibold">
                    🚀 Go To Your Dashboard
                  </span>
                </div>
              </Link>
            ) : (
              <Link to={"/signup"}>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100/10 to-blue-100/10 border border-blue-100/20 rounded-full px-4 py-2 mb-8 animate-slideInLeft">
                  <div className="w-2 h-2 bg-blue-100 rounded-full animate-ping"></div>
                  <span className="text-blue-100 text-sm font-medium">
                    🚀 Join Thousands of Students
                  </span>
                </div>
              </Link>
            )}

            {/* Main Headline with Staggered Animation */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="block animate-slideInLeft">
                Empower Your Future with
              </span>
              <span className="block mb-6 bg-gradient-to-r from-pink-100 via-blue-100 to-yellow-100 bg-clip-text text-transparent animate-slideInLeft delay-200">
                LearnVerse
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl text-richblack-200 mt-2 animate-slideInLeft delay-400">
                Your Gateway to Tech Excellence
              </span>
            </h1>

            {/* Enhanced Subtext */}
            <p className="text-lg text-richblack-200 mb-8 animate-slideInLeft delay-600 leading-relaxed">
              Interactive coding courses taught by industry experts. Join
              thousands of developers who've
              <HighlightedText> transformed their careers</HighlightedText> with
              our hands-on learning approach.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slideInLeft delay-800">
              <button className="group relative bg-gradient-to-r from-blue-100 to-blue-200 text-richblack-900 px-8 py-2 rounded-xl font-semibold hover:from-blue-200 hover:to-blue-100 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-blue-100/25">
                <FaPlay
                  size={16}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                Explore Courses
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="group relative border border-blue-100 text-blue-100 px-8 py-2 rounded-xl font-semibold hover:bg-blue-100 hover:text-richblack-900 hover:scale-105 transition-all duration-300 overflow-hidden">
                <span className="relative z-10">Learn More</span>
                <div className="absolute inset-0 bg-blue-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          </div>

          {/* Enhanced Hero Image Section */}
          <div className="relative animate-slideInRight">
            {/* Floating Elements Around Image */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-100 rounded-full animate-bounce delay-300"></div>
            <div className="absolute -bottom-8 -right-6 w-10 h-10 bg-pink-100 rounded-full animate-bounce delay-900"></div>

            {/* Main Hero Card */}
            <div className="relative bg-gradient-to-br from-richblack-700 via-richblack-800 to-richblack-900 rounded-3xl p-8 transform hover:scale-105 transition-all duration-500 shadow-2xl border border-richblack-600">
              {/* Glowing Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-blue-100/20 to-yellow-100/20 rounded-3xl blur-sm opacity-75 animate-pulse"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Code Editor Mockup */}
                <div className="bg-richblack-900/60 rounded-xl p-4 border border-richblack-600">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-pink-200 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-200 rounded-full"></div>
                    <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
                  </div>
                  <div className="flex justify-start relative z-10">
                    <div className="pr-2 pb-1 flex flex-col gap-[1px] items-center text-richblack-400 font-inter text-sm">
                      <p>1</p>
                      <p>2</p>
                      <p>3</p>
                      <p>4</p>
                      <p>5</p>
                      <p>6</p>
                      <p>7</p>
                      <p>8</p>
                      <p>9</p>
                      <p>10</p>
                      <p>11</p>
                      <p>12</p>
                      <p>13</p>
                    </div>
                    <div className={`flex flex-col gap-2 items-start`}>
                      <TypeAnimation
                        sequence={[
                          `<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<linkrel="stylesheet"\nhref="styles.css">\n</head>\n<body>\n<h1><a href="/">Link</a></h1>\n<nav>\n<a href="/one">One</a>\n<ahref="/two">Two</<a>\n</nav>`,
                          1000,
                          "",
                        ]}
                        repeat={Infinity}
                        style={{
                          whiteSpace: "pre-line",
                          fontFamily: "Menlo, Monaco, 'Courier New', monospace",
                          fontSize: "14px",
                          fontWeight: "bold",
                          color: "#47A5C5", // Text color in VS Code theme
                        }}
                        cursor={true}
                        omitDeletionAnimation={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Achievement Cards */}
            <div className="absolute -top-8 -right-4 bg-gradient-to-r from-blue-100 to-pink-100 text-richblack-900 px-4 py-2 rounded-xl font-semibold text-sm animate-float shadow-lg">
              🏆 Course Completed!
            </div>
            <div className="absolute -bottom-8 -left-4 bg-gradient-to-r from-blue-100 to-yellow-100 text-richblack-900 px-4 py-2 rounded-xl font-semibold text-sm animate-float delay-500 shadow-lg">
              💡 New Skill Unlocked!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
