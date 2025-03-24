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
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "dashboard/my-profile",
            element: <MyProfile />,
          },
          {
            path: "dashboard/settings",
            element: <Settings />,
          },
          {
            path: "dashboard/change-password",
            element: <ChangePassword />,
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
