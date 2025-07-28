import React, { useEffect, useState } from "react";
import {
  FaClock,
  FaCode,
  FaPlay,
  FaRocket,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoading } from "../../../redux/slices/loaderSlice";
import apiConnector from "../../../services/apiConnector";
import endpoints from "../../../services/apiEndpoints";

const { VIEW_ALL_COURSES_API } = endpoints;

const PopularCoursesSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState([]);
  const [allCourseDetails, setAllCourseDetails] = useState([]);

  const fetchAllCourses = async () => {
    setLoading(true);
    try {
      const response = await apiConnector("GET", VIEW_ALL_COURSES_API);
      if (response?.data?.success) {
        setAllCourseDetails(response.data.data);
      }
    } catch (error) {
      dispatch(handleError(navigate, error, false));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

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

        {/* Course Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading
            ? // Show skeleton loaders while loading
              Array.from({ length: 4 }).map((_, index) => (
                <CourseCardSkeleton key={index} />
              ))
            : // Show actual course cards when data is loaded
              allCourseDetails?.mostPopularCourses
                ?.filter((course) => course.status === "Published")
                ?.slice(0, 4)
                ?.map((course, index) => {
                  const originalPrice =
                    parseInt(course.price) *
                    (1 +
                      (Math.floor(Math.random() * (30 - 10 + 1)) + 10) / 100);
                  return (
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
                            src={
                              course.thumbNail.secure_url || "/placeholder.svg"
                            }
                            alt={course.courseName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/80 via-transparent to-transparent"></div>

                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-gradient-to-r from-richblue-100 to-richblue-200 w-16 h-16 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                              <FaPlay className="text-richblack-900 text-xl ml-1" />
                            </div>
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
                            {course.courseName}
                          </h3>

                          {/* Instructor */}
                          <div className="text-richblack-300 mb-4 flex items-center gap-2">
                            <div className="w-8 h-8 bg-richblue-200 rounded-full flex items-center justify-center">
                              <img
                                src={course.instructor?.image}
                                alt={course.instructor?.firstName}
                                className="w-full rounded-full"
                              />
                            </div>
                            <span className="text-sm">{`${course.instructor?.firstName} ${course.instructor?.lastName}`}</span>
                          </div>

                          {/* Course Stats */}
                          <div className="flex items-center justify-between mb-4 text-sm">
                            <div className="flex items-center gap-1">
                              <FaStar className="text-yellow-100" size={14} />
                              <span className="text-white font-semibold">
                                {course.ratingAndReview?.reduce(
                                  (acc, curr) => acc + curr.rating,
                                  0
                                ) / course.ratingAndReview?.length}
                              </span>
                              <span className="text-richblack-400">
                                ({course?.ratingAndReview?.length})
                              </span>
                            </div>
                          </div>

                          {/* Pricing */}
                          <div className="flex items-center gap-3 mb-6">
                            <span className="text-2xl font-bold text-yellow-50">
                              {formatNumberWithCommas(course.price)}
                            </span>
                            <span className="text-richblack-400 line-through text-sm">
                              {formatNumberWithCommas(originalPrice)}
                            </span>
                            <span className="bg-gradient-to-r from-pink-100/20 to-yellow-100/20 text-pink-100 px-2 py-1 rounded-md text-xs font-medium">
                              Save{" "}
                              {Math.round(
                                ((Number.parseInt(originalPrice) -
                                  Number.parseInt(course.price)) /
                                  Number.parseInt(originalPrice)) *
                                  100
                              )}
                              %
                            </span>
                          </div>

                          {/* CTA Button */}
                          <Link to={`/course/${course._id}`}>
                            <button
                              className="w-full bg-gradient-to-r from-blue-100 to-richblue-100 text-richblack-900 py-2 rounded-xl font-bold 
                            text-sm hover:from-caribbeangreen-50 hover:to-blue-100 hover:scale-105 transition-all duration-300 flex items-center 
                            justify-center gap-2 shadow-lg hover:shadow-blue-100/25 group/btn"
                            >
                              <span>Visit Course</span>
                              <FaRocket
                                size={14}
                                className="group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-all duration-300"
                              />
                            </button>
                          </Link>
                        </div>
                      </div>

                      {/* Floating elements */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-100 rounded-full animate-bounce opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-yellow-100 rounded-full animate-bounce delay-300 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  );
                })}
        </div>

        {/* View All Courses Button */}
        <div className="text-center mt-16">
          <Link to="/all-courses">
            <button className="group bg-gradient-to-r from-richblack-700 to-richblack-600 border border-blue-100/30 text-blue-100 px-8 py-2 rounded-2xl font-semibold hover:from-blue-100 hover:to-blue-200 hover:text-richblack-900 hover:scale-105 transition-all duration-300 overflow-hidden relative">
              <span className="relative z-10 flex items-center gap-3">
                View All Courses
                <FaPlay
                  size={16}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularCoursesSection;

// Skeleton Loader Component for Course Cards
const CourseCardSkeleton = () => {
  return (
    <div className="group relative bg-richblack-800 rounded-2xl overflow-hidden border border-richblack-600">
      <div className="relative">
        {/* Course Image Skeleton */}
        <div className="relative h-48 overflow-hidden">
          <div className="w-full h-full bg-richblack-700 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/80 via-transparent to-transparent"></div>
        </div>

        {/* Course Content Skeleton */}
        <div className="p-6">
          {/* Tags Skeleton */}
          <div className="flex flex-wrap gap-2 mb-3">
            <div className="bg-richblack-700 animate-pulse rounded-md w-16 h-6"></div>
            <div className="bg-richblack-700 animate-pulse rounded-md w-20 h-6"></div>
            <div className="bg-richblack-700 animate-pulse rounded-md w-14 h-6"></div>
          </div>

          {/* Course Title Skeleton */}
          <div className="mb-3">
            <div className="h-6 bg-richblack-700 animate-pulse rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-richblack-700 animate-pulse rounded w-1/2"></div>
          </div>

          {/* Instructor Skeleton */}
          <div className="text-richblack-300 mb-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-richblack-700 animate-pulse rounded-full"></div>
            <div className="h-4 bg-richblack-700 animate-pulse rounded w-24"></div>
          </div>

          {/* Course Stats Skeleton */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-richblack-700 animate-pulse rounded"></div>
              <div className="h-4 bg-richblack-700 animate-pulse rounded w-8"></div>
              <div className="h-4 bg-richblack-700 animate-pulse rounded w-12"></div>
            </div>
          </div>

          {/* Pricing Skeleton */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-6 bg-richblack-700 animate-pulse rounded w-16"></div>
            <div className="h-4 bg-richblack-700 animate-pulse rounded w-12"></div>
            <div className="h-6 bg-richblack-700 animate-pulse rounded w-16"></div>
          </div>

          {/* CTA Button Skeleton */}
          <div className="w-full h-10 bg-richblack-700 animate-pulse rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

function formatNumberWithCommas(number) {
  number = Number(number);
  if (isNaN(number)) return;
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
