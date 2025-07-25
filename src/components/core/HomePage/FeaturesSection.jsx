import React from "react";
import { FaCertificate, FaCode, FaRocket, FaUsers } from "react-icons/fa";

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-20 bg-richblack-800 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-caribbeangreen-100/10 to-blue-100/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-yellow-100/10 to-pink-100/10 rounded-full blur-3xl animate-pulse delay-700"></div>

        {/* Floating Icons */}
        <div className="absolute top-32 left-1/4 opacity-5 animate-float">
          <FaCode size={40} className="text-caribbeangreen-100" />
        </div>
        <div className="absolute bottom-40 right-1/4 opacity-5 animate-float delay-1000">
          <FaRocket size={35} className="text-blue-100" />
        </div>
      </div>

      <div className="container mx-auto">
        <div className="w-11/12 mx-auto relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-caribbeangreen-100/10 to-blue-100/10 border border-caribbeangreen-100/20 rounded-full px-6 py-2 mb-6">
              <div className="w-2 h-2 bg-caribbeangreen-100 rounded-full animate-ping"></div>
              <span className="text-caribbeangreen-100 text-sm font-medium">
                ✨ Premium Features
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-caribbeangreen-100 to-blue-100 bg-clip-text text-transparent">
                LearnVerse
              </span>
              ?
            </h2>
            <p className="text-xl text-richblack-200 max-w-3xl mx-auto leading-relaxed">
              Discover the cutting-edge features that make LearnVerse the
              ultimate platform for your coding journey
            </p>
          </div>

          {/* Enhanced Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Feature 1 - Interactive Coding */}
            <div className="group relative bg-gradient-to-br from-richblack-700 via-richblack-800 to-richblack-900 p-8 rounded-2xl hover:-translate-y-4 transition-all duration-500 border border-richblack-600 hover:border-caribbeangreen-100/30 overflow-hidden">
              {/* Glowing effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-caribbeangreen-100/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Icon with enhanced styling */}
              <div className="relative mb-6">
                <div className="bg-gradient-to-r from-caribbeangreen-100 to-caribbeangreen-200 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <FaCode className="text-richblack-900" size={28} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-caribbeangreen-100 rounded-full opacity-20 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-caribbeangreen-100 transition-colors duration-300">
                Interactive Coding
              </h3>
              <p className="text-richblack-300 mb-6 leading-relaxed">
                Learn by doing with hands-on coding exercises, real-world
                projects, and instant feedback systems
              </p>

              {/* Progress indicator */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-richblack-400">Hands-on Practice</span>
                  <span className="text-caribbeangreen-100">95%</span>
                </div>
                <div className="w-full bg-richblack-600 rounded-full h-2">
                  <div className="bg-gradient-to-r from-caribbeangreen-100 to-caribbeangreen-200 h-2 rounded-full w-[95%] group-hover:animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Feature 2 - Expert Instructors */}
            <div className="group relative bg-gradient-to-br from-richblack-700 via-richblack-800 to-richblack-900 p-8 rounded-2xl hover:-translate-y-4 transition-all duration-500 border border-richblack-600 hover:border-blue-100/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative mb-6">
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <FaUsers className="text-richblack-900" size={28} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-100 rounded-full opacity-20 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-100 transition-colors duration-300">
                Expert Instructors
              </h3>
              <p className="text-richblack-300 mb-6 leading-relaxed">
                Learn from industry professionals with years of real-world
                experience at top tech companies
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-richblack-400">
                    Industry Experience
                  </span>
                  <span className="text-blue-100">10+ Years</span>
                </div>
                <div className="w-full bg-richblack-600 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 h-2 rounded-full w-full group-hover:animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Feature 3 - Certificates */}
            <div className="group relative bg-gradient-to-br from-richblack-700 via-richblack-800 to-richblack-900 p-8 rounded-2xl hover:-translate-y-4 transition-all duration-500 border border-richblack-600 hover:border-yellow-100/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative mb-6">
                <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <FaCertificate className="text-richblack-900" size={28} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-100 rounded-full opacity-20 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-100 transition-colors duration-300">
                Certificates
              </h3>
              <p className="text-richblack-300 mb-6 leading-relaxed">
                Earn industry-recognized certificates upon course completion to
                boost your career prospects
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-richblack-400">Recognition Rate</span>
                  <span className="text-yellow-100">98%</span>
                </div>
                <div className="w-full bg-richblack-600 rounded-full h-2">
                  <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 h-2 rounded-full w-[98%] group-hover:animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Feature 4 - Career Growth */}
            <div className="group relative bg-gradient-to-br from-richblack-700 via-richblack-800 to-richblack-900 p-8 rounded-2xl hover:-translate-y-4 transition-all duration-500 border border-richblack-600 hover:border-pink-100/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-100/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative mb-6">
                <div className="bg-gradient-to-r from-pink-100 to-pink-200 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <FaRocket className="text-richblack-900" size={28} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-100 rounded-full opacity-20 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-pink-100 transition-colors duration-300">
                Career Growth
              </h3>
              <p className="text-richblack-300 mb-6 leading-relaxed">
                Accelerate your career with in-demand skills and dedicated job
                placement support
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-richblack-400">Job Placement</span>
                  <span className="text-pink-100">87%</span>
                </div>
                <div className="w-full bg-richblack-600 rounded-full h-2">
                  <div className="bg-gradient-to-r from-pink-100 to-pink-200 h-2 rounded-full w-[87%] group-hover:animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Features Showcase */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Feature highlights */}
            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="bg-gradient-to-r from-caribbeangreen-100 to-blue-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-richblack-900 font-bold text-lg">
                    01
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">
                    Live Coding Sessions
                  </h4>
                  <p className="text-richblack-300">
                    Join interactive live sessions with instructors and fellow
                    students for real-time learning.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-gradient-to-r from-yellow-100 to-pink-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-richblack-900 font-bold text-lg">
                    02
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">
                    AI-Powered Learning
                  </h4>
                  <p className="text-richblack-300">
                    Get personalized learning paths and recommendations powered
                    by advanced AI algorithms.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="bg-gradient-to-r from-blue-100 to-caribbeangreen-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-richblack-900 font-bold text-lg">
                    03
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">
                    Community Support
                  </h4>
                  <p className="text-richblack-300">
                    Connect with a vibrant community of learners and get help
                    whenever you need it.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Interactive demo card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-richblack-700 to-richblack-800 rounded-3xl p-8 border border-richblack-600 hover:border-caribbeangreen-100/30 transition-all duration-500 group">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-caribbeangreen-100/5 via-blue-100/5 to-yellow-100/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-2xl font-bold text-white">
                      Learning Dashboard
                    </h4>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-pink-200 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-200 rounded-full animate-pulse delay-200"></div>
                      <div className="w-3 h-3 bg-caribbeangreen-200 rounded-full animate-pulse delay-400"></div>
                    </div>
                  </div>

                  {/* Mock progress bars */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-richblack-200">
                          JavaScript Fundamentals
                        </span>
                        <span className="text-caribbeangreen-100">85%</span>
                      </div>
                      <div className="w-full bg-richblack-600 rounded-full h-3">
                        <div className="bg-gradient-to-r from-caribbeangreen-100 to-blue-100 h-3 rounded-full w-[85%] animate-pulse"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-richblack-200">
                          React Development
                        </span>
                        <span className="text-blue-100">72%</span>
                      </div>
                      <div className="w-full bg-richblack-600 rounded-full h-3">
                        <div className="bg-gradient-to-r from-blue-100 to-yellow-100 h-3 rounded-full w-[72%] animate-pulse delay-300"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-richblack-200">
                          Node.js Backend
                        </span>
                        <span className="text-yellow-100">45%</span>
                      </div>
                      <div className="w-full bg-richblack-600 rounded-full h-3">
                        <div className="bg-gradient-to-r from-yellow-100 to-pink-100 h-3 rounded-full w-[45%] animate-pulse delay-500"></div>
                      </div>
                    </div>
                  </div>

                  {/* Achievement badges */}
                  <div className="flex gap-3 mt-6">
                    <div className="bg-gradient-to-r from-caribbeangreen-100/20 to-blue-100/20 border border-caribbeangreen-100/30 rounded-lg px-3 py-2 text-sm text-caribbeangreen-100">
                      🏆 Fast Learner
                    </div>
                    <div className="bg-gradient-to-r from-yellow-100/20 to-pink-100/20 border border-yellow-100/30 rounded-lg px-3 py-2 text-sm text-yellow-100">
                      🔥 Streak: 15 days
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-caribbeangreen-100 rounded-full animate-bounce opacity-80"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-100 rounded-full animate-bounce delay-500 opacity-80"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
