import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../../redux/slices/loaderSlice";
import endpoints from "../../../../services/apiEndpoints";
import apiConnector from "../../../../services/apiConnector";
import Loader from "../../../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import ChartData from "./ChartData";
import { handleError } from "../../../../services/operations/handleError";

const { VIEW_ENROLLED_COURSES_API } = endpoints;

const InstructorDashboard = () => {
  const [allCourses, setAllCourses] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.loader);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const fetchAllCourses = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        VIEW_ENROLLED_COURSES_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (response?.data?.success) {
        setAllCourses(response.data.data);
      }
    } catch (error) {
      dispatch(handleError(navigate, error));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  if (!user?._id || loading)
    return (
      <div className="fixed bottom-0 z-50">
        <Loader />
      </div>
    );

  return user?.accountType === "Instructor" ? (
    <div className="w-full">
      <div className="w-11/12 max-w-[1024px] mx-auto flex flex-col lg:flex-row gap-6 my-6">
        <div className="bg-richblack-800 rounded-lg p-6 flex flex-col gap-3 border border-richblack-700">
          <h3 className="text-xl text-richblack-5 font-bold">Statistics</h3>
          <div className="flex flex-col gap-1">
            <p className="whitespace-nowrap text-richblack-100">
              Total Courses:{" "}
            </p>
            <div className="text-lg font-semibold">{allCourses?.length}</div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="whitespace-nowrap text-richblack-100">
              Total Enrolled Students:
            </p>
            <div className="text-lg font-semibold">
              {allCourses?.reduce(
                (acc, curr) => acc + curr.studentsEnrolled.length,
                0
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="whitespace-nowrap text-richblack-100">
              Total Income:
            </p>
            <div className="text-lg font-semibold">
              Rs.&nbsp;
              {formatWithCommas(
                allCourses
                  ?.reduce(
                    (acc, curr) =>
                      acc +
                      parseFloat(curr.price) * curr.studentsEnrolled.length,
                    0
                  )
                  .toFixed(2)
              )}
            </div>
          </div>
        </div>
        <div className="w-full bg-richblack-800 rounded-lg p-6 border border-richblack-700">
          <ChartData courses={allCourses} />
        </div>
      </div>
      <div className="w-11/12 max-w-[1024px] mx-auto px-3 py-6 bg-richblack-800 rounded-lg border border-richblack-700">
        <div className="flex justify-between items-end px-2 mb-3">
          <h3 className="text-xl text-richblack-5 font-bold">Your Courses</h3>
          <Link to="/dashboard/my-courses">
            <button className=" text-yellow-50 font-bold">View All</button>
          </Link>
        </div>
        <div className="flex flex-wrap gap-3 justify-evenly">
          {[...allCourses]
            ?.sort(
              (a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length
            )
            ?.slice(0, 3)
            ?.map((item, index) => (
              <div
                className="w-[300px] p-3 bg-richblack-700 rounded-lg"
                key={index}
              >
                <img
                  src={item.thumbNail?.secure_url}
                  alt="Course"
                  className="w-full h-[156px] rounded-lg"
                />
                <div className="flex flex-col gap-2 justify-between mt-3">
                  <div className="text-richblack-5 font-semibold">
                    {item.courseName}
                  </div>
                  <div className="flex text-sm text-richblack-100">
                    <span>
                      {item.studentsEnrolled?.length} students enrolled |
                    </span>
                    <span>
                      &nbsp;Rs.{formatWithCommas(item.price.toFixed(2))}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="text-2xl text-pink-500 text-center mt-16">
      Only Instructors Can See The Instructor Dashboard!
    </div>
  );
};

export default InstructorDashboard;

const formatWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
