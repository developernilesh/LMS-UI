import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/common/Footer";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/common/Navbar";
const App = () => {
  return (
    <>
      <nav className="w-full bg-richblack-900 text-richblack-25 border-b border-richblack-700 font-inter">
        <Navbar />
      </nav>
      <main className="w-full min-h-screen bg-richblack-900 text-richblack-25 font-inter">
        <Outlet />
      </main>
      <footer className="w-full bg-richblack-800 text-richblack-200">
        <Footer />
      </footer>
      <Toaster/>
    </>
  );
};

export default App;
