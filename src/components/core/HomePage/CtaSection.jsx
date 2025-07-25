import React from "react";
import { FaPlay, FaRocket } from "react-icons/fa";

const CtaSection = () => {
  return <section className="py-32 bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900 relative overflow-hidden">
  {/* Enhanced Background Elements */}
  <div className="absolute inset-0">
    {/* Animated gradient orbs */}
    <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-caribbeangreen-100/20 to-blue-100/20 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-yellow-100/15 to-pink-100/15 rounded-full blur-3xl animate-pulse delay-700"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-richblue-100/10 to-caribbeangreen-100/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

    {/* Floating code elements */}
    <div className="absolute top-20 left-1/4 opacity-10 animate-float">
      <div className="font-mono text-caribbeangreen-100 text-lg">
        {"<StartJourney />"}
      </div>
    </div>
    <div className="absolute bottom-20 right-1/4 opacity-10 animate-float delay-500">
      <div className="font-mono text-blue-100 text-lg">
        {"success.then()"}
      </div>
    </div>
    <div className="absolute top-32 right-20 opacity-10 animate-float delay-1000">
      <div className="font-mono text-yellow-100 text-lg">
        {"const future = 'bright'"}
      </div>
    </div>

    {/* Grid pattern overlay */}
    <div className="absolute inset-0 opacity-5">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 214, 160, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 214, 160, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      ></div>
    </div>
  </div>
  <div className="container mx-auto">
    <div className="w-11/12 max-w-6xl mx-auto text-center relative z-10">
      {/* Enhanced Badge */}
      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-caribbeangreen-100/10 to-blue-100/10 border border-caribbeangreen-100/30 rounded-full px-6 py-3 mb-8 animate-slideInLeft">
        <div className="w-3 h-3 bg-caribbeangreen-100 rounded-full animate-ping"></div>
        <span className="text-caribbeangreen-100 text-sm font-semibold">
          🚀 Transform Your Career Today
        </span>
      </div>

      {/* Enhanced Headline */}
      <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-8 animate-slideInLeft delay-200">
        Ready to{" "}
        <span className="bg-gradient-to-r from-caribbeangreen-100 via-blue-100 to-yellow-100 bg-clip-text text-transparent">
          Code Your Future
        </span>
        ?
      </h2>

      {/* Enhanced Subtext */}
      <p className="sm:text-lg text-richblack-200 mb-12 max-w-4xl mx-auto leading-relaxed animate-slideInLeft delay-400">
        Join over{" "}
        <span className="text-caribbeangreen-100 font-bold">
          50,000+ students
        </span>{" "}
        who have already transformed their careers with LearnVerse. Your
        journey to becoming a{" "}
        <span className="text-blue-100 font-bold">skilled developer</span>{" "}
        starts with a single click.
      </p>

      {/* Stats Row */}
      <div className="flex flex-wrap justify-center gap-8 mb-12 animate-slideInLeft delay-600">
        <div className="text-center">
          <div className="text-3xl font-bold text-caribbeangreen-100 mb-1">
            50K+
          </div>
          <div className="text-richblack-300 text-sm">Happy Students</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-100 mb-1">95%</div>
          <div className="text-richblack-300 text-sm">Success Rate</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-yellow-100 mb-1">
            24/7
          </div>
          <div className="text-richblack-300 text-sm">Support</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-pink-100 mb-1">
            200+
          </div>
          <div className="text-richblack-300 text-sm">Courses</div>
        </div>
      </div>

      {/* Enhanced CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-slideInLeft delay-800">
        <button className="group relative bg-gradient-to-r from-yellow-100 to-yellow-200 text-richblack-900 px-8 py-2 rounded-xl font-semibold hover:from-yellow-200 hover:to-yellow-100 hover:scale-110 transition-all duration-300 flex items-center gap-4 shadow-2xl hover:shadow-yellow-100/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <FaRocket
            size={24}
            className="group-hover:rotate-12 group-hover:scale-125 transition-all duration-300"
          />
          <span className="relative z-10">Start Learning Now</span>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-100 rounded-full animate-ping opacity-75"></div>
        </button>

        <button className="group relative border border-blue-100 text-blue-100 px-8 py-2 rounded-xl font-semibold hover:bg-blue-100 hover:text-richblack-900 hover:scale-105 transition-all duration-300 overflow-hidden flex items-center gap-3">
          <span className="relative z-10">View Course Catalog</span>
          <FaPlay
            size={16}
            className="group-hover:scale-110 transition-transform duration-300 relative z-10"
          />
          <div className="absolute inset-0 bg-blue-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </button>
      </div>

      {/* Trust Indicators */}
      {/* <div className="animate-slideInLeft delay-1000">
      <p className="text-richblack-400 text-sm mb-6">
        Trusted by students from top companies
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
        <div className="bg-gradient-to-r from-richblack-700 to-richblack-600 px-6 py-3 rounded-lg border border-richblack-500">
          <span className="text-richblack-200 font-semibold">Google</span>
        </div>
        <div className="bg-gradient-to-r from-richblack-700 to-richblack-600 px-6 py-3 rounded-lg border border-richblack-500">
          <span className="text-richblack-200 font-semibold">
            Microsoft
          </span>
        </div>
        <div className="bg-gradient-to-r from-richblack-700 to-richblack-600 px-6 py-3 rounded-lg border border-richblack-500">
          <span className="text-richblack-200 font-semibold">Amazon</span>
        </div>
        <div className="bg-gradient-to-r from-richblack-700 to-richblack-600 px-6 py-3 rounded-lg border border-richblack-500">
          <span className="text-richblack-200 font-semibold">Meta</span>
        </div>
        <div className="bg-gradient-to-r from-richblack-700 to-richblack-600 px-6 py-3 rounded-lg border border-richblack-500">
          <span className="text-richblack-200 font-semibold">
            Netflix
          </span>
        </div>
      </div>
    </div> */}

      {/* Floating Achievement Cards */}
      <div className="absolute -top-8 left-8 bg-gradient-to-r from-caribbeangreen-100 to-blue-100 text-richblack-900 px-4 py-2 rounded-xl font-semibold text-sm animate-float shadow-lg hidden lg:block">
        💼 Career Ready in 6 Months
      </div>
      <div className="absolute -bottom-8 right-8 bg-gradient-to-r from-yellow-100 to-pink-100 text-richblack-900 px-4 py-2 rounded-xl font-semibold text-sm animate-float delay-500 shadow-lg hidden lg:block">
        🎯 100% Job Guarantee
      </div>
      <div className="absolute top-3/4 -left-8 bg-gradient-to-r from-blue-100 to-caribbeangreen-100 text-richblack-900 px-4 py-2 rounded-xl font-semibold text-sm animate-float delay-1000 shadow-lg hidden xl:block transform -rotate-12">
        ⚡ Learn at Your Pace
      </div>
      <div className="absolute top-[60%] -right-8 bg-gradient-to-r from-pink-100 to-yellow-100 text-richblack-900 px-4 py-2 rounded-xl font-semibold text-sm animate-float delay-700 shadow-lg hidden xl:block transform rotate-12">
        🏆 Industry Certified
      </div>
    </div>
  </div>

  {/* Bottom Wave Pattern */}
  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-richblack-900 to-transparent"></div>
</section>;
};

export default CtaSection;
