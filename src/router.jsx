import App from "./App.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import { createBrowserRouter } from "react-router-dom";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Error from "./pages/Error.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import MyProfile from "./components/core/DashBoard/myProfile/MyProfile.jsx";
import Settings from "./components/core/DashBoard/settings/Settings.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import EnrolledCourse from "./components/core/DashBoard/enrolledCourses/EnrolledCourse.jsx";
import MyWishlist from "./components/core/DashBoard/myWishlist/MyWishlist.jsx";
import AddCourse from "./components/core/DashBoard/addCourses/AddCourse.jsx";
import ShowInstructorCourses from "./components/core/DashBoard/instructorCourse/ShowInstructorCourses.jsx";
import EditInstructorCourse from "./components/core/DashBoard/instructorCourse/EditInstructorCourse.jsx";
import Catalog from "./pages/Catalog.jsx";
import SpecificCourse from "./pages/SpecificCourse.jsx";
import CourseContent from "./pages/CourseContent.jsx";
import InstructorDashboard from "./components/core/DashBoard/instructorDashboard/InstructorDashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "update-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "catalog/:categoryId",
        element: <Catalog />,
      },
      {
        path: "course/:courseId",
        element: <SpecificCourse />,
      },
      {
        path: "view-course-content/:courseId",
        element: (
          <ProtectedRoute>
            <CourseContent />
          </ProtectedRoute>
        ),
      },
      {
        element: <Dashboard />,
        children: [
          {
            path: "dashboard/my-profile",
            element: (
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/settings",
            element: (
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/change-password",
            element: (
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/enrolled-courses",
            element: (
              <ProtectedRoute>
                <EnrolledCourse />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/my-wishlist",
            element: (
              <ProtectedRoute>
                <MyWishlist />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/add-course",
            element: (
              <ProtectedRoute>
                <AddCourse />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/my-courses",
            element: (
              <ProtectedRoute>
                <ShowInstructorCourses />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/instructor",
            element: (
              <ProtectedRoute>
                <InstructorDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/edit-instructor-course/:courseId",
            element: (
              <ProtectedRoute>
                <EditInstructorCourse />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

export default router;
