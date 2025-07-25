import React from "react";
import { FaClock, FaCode, FaPlay, FaRocket, FaStar, FaUser } from "react-icons/fa";

const PopularCoursesSection = () => {
  return (
    <section
      id="courses"
      className="py-20 bg-richblack-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-100/15 to-yellow-100/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-100/10 to-caribbeangreen-100/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Floating Icons */}
        <div className="absolute top-32 right-1/4 opacity-5 animate-float">
          <FaCode size={45} className="text-blue-100" />
        </div>
        <div className="absolute bottom-40 left-1/4 opacity-5 animate-float delay-700">
          <FaPlay size={40} className="text-yellow-100" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100/10 to-yellow-100/10 border border-blue-100/20 rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-blue-100 rounded-full animate-ping"></div>
            <span className="text-blue-100 text-sm font-medium">
              🎓 Most Popular Courses
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Master In-Demand{" "}
            <span className="bg-gradient-to-r from-blue-100 via-yellow-100 to-pink-100 bg-clip-text text-transparent">
              Tech Skills
            </span>
          </h2>
          <p className="text-xl text-richblack-200 max-w-3xl mx-auto leading-relaxed">
            Choose from our most popular courses designed by industry experts
            and loved by thousands of students worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Full Stack Web Development",
              instructor: "Sarah Johnson",
              rating: 4.9,
              students: 1234,
              duration: "12 weeks",
              level: "Beginner to Advanced",
              price: "$199",
              originalPrice: "$299",
              image:
                "/placeholder.svg?height=200&width=300&text=Web+Development",
              tags: ["React", "Node.js", "MongoDB"],
              featured: true,
            },
            {
              title: "Python for Data Science",
              instructor: "Dr. Michael Chen",
              rating: 4.8,
              students: 987,
              duration: "8 weeks",
              level: "Intermediate",
              price: "$149",
              originalPrice: "$199",
              image:
                "/placeholder.svg?height=200&width=300&text=Python+Data+Science",
              tags: ["Python", "Pandas", "ML"],
              featured: false,
            },
            {
              title: "Machine Learning Fundamentals",
              instructor: "Emily Rodriguez",
              rating: 4.9,
              students: 756,
              duration: "10 weeks",
              level: "Advanced",
              price: "$249",
              originalPrice: "$349",
              image:
                "/placeholder.svg?height=200&width=300&text=Machine+Learning",
              tags: ["TensorFlow", "PyTorch", "AI"],
              featured: false,
            },
            {
              title: "React & Next.js Mastery",
              instructor: "Alex Thompson",
              rating: 4.7,
              students: 543,
              duration: "6 weeks",
              level: "Intermediate",
              price: "$129",
              originalPrice: "$179",
              image: "/placeholder.svg?height=200&width=300&text=React+NextJS",
              tags: ["React", "Next.js", "TypeScript"],
              featured: false,
            },
          ].map((course, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br from-richblack-800 via-richblack-700 to-richblack-800 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 border ${
                course.featured
                  ? "border-yellow-100/40 shadow-lg shadow-yellow-100/10"
                  : "border-richblack-600 hover:border-blue-100/30"
              }`}
            >
              {/* Featured Badge */}
              {course.featured && (
                <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-yellow-100 to-yellow-200 text-richblack-900 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  🔥 BESTSELLER
                </div>
              )}

              {/* Glowing effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/5 via-yellow-100/5 to-pink-100/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative">
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/80 via-transparent to-transparent"></div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-gradient-to-r from-blue-100 to-yellow-100 w-16 h-16 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <FaPlay className="text-richblack-900 text-xl ml-1" />
                    </div>
                  </div>

                  {/* Level Badge */}
                  <div className="absolute top-4 right-4 bg-richblack-800/80 backdrop-blur-sm text-richblack-200 px-3 py-1 rounded-full text-xs font-medium">
                    {course.level}
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {course.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gradient-to-r from-richblack-600 to-richblack-700 text-richblack-200 px-2 py-1 rounded-md text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Course Title */}
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-100 transition-colors duration-300">
                    {course.title}
                  </h3>

                  {/* Instructor */}
                  <p className="text-richblack-300 mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-richblue-200 rounded-full flex items-center justify-center">
                      <FaUser size={12} className="text-richblue-900" />
                    </div>
                    <span className="text-sm">{course.instructor}</span>
                  </p>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-100" size={14} />
                      <span className="text-white font-semibold">
                        {course.rating}
                      </span>
                      <span className="text-richblack-400">
                        ({course.students})
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-richblack-300">
                      <FaClock size={12} />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl font-bold text-yellow-50">
                      {course.price}
                    </span>
                    <span className="text-richblack-400 line-through text-sm">
                      {course.originalPrice}
                    </span>
                    <span className="bg-gradient-to-r from-pink-100/20 to-yellow-100/20 text-pink-100 px-2 py-1 rounded-md text-xs font-medium">
                      Save{" "}
                      {Math.round(
                        ((Number.parseInt(course.originalPrice.slice(1)) -
                          Number.parseInt(course.price.slice(1))) /
                          Number.parseInt(course.originalPrice.slice(1))) *
                          100
                      )}
                      %
                    </span>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-gradient-to-r from-blue-100 to-caribbeangreen-50 text-richblack-900 py-3 rounded-xl font-bold text-sm hover:from-caribbeangreen-50 hover:via-pink-100 hover:to-blue-100 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-100/25 group/btn">
                    <span>Enroll Now</span>
                    <FaRocket
                      size={14}
                      className="group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-all duration-300"
                    />
                  </button>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-100 rounded-full animate-bounce opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-yellow-100 rounded-full animate-bounce delay-300 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* View All Courses Button */}
        <div className="text-center mt-16">
          <button className="group bg-gradient-to-r from-richblack-700 to-richblack-600 border-2 border-blue-100/30 text-blue-100 px-12 py-4 rounded-2xl font-bold text-lg hover:from-blue-100 hover:to-yellow-100 hover:text-richblack-900 hover:scale-105 transition-all duration-300 overflow-hidden relative">
            <span className="relative z-10 flex items-center gap-3">
              View All Courses
              <FaPlay
                size={16}
                className="group-hover:scale-110 transition-transform duration-300"
              />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-yellow-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularCoursesSection;
