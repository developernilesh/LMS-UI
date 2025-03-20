import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/common/Footer";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/common/Navbar";

const App = () => {
  return (
    <>
      <nav className="w-full bg-richblack-900 text-richblack-25 border-b border-richblack-700 font-inter fixed top-0 z-40">
        <Navbar />
      </nav>
      <main className="w-full min-h-[calc(100vh-48px)] bg-richblack-900 text-richblack-25 font-inter mt-12">
        <Outlet />
      </main>
      {/* 
      <footer className="w-full bg-richblack-800 text-richblack-200">
        <Footer />
      </footer>
      */}
      <Toaster />
    </>
  );
};

export default App;
