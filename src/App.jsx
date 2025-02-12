import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Footer from "./components/common/Footer";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      {/* <nav>
        <Navbar />
      </nav> */}
      <main className="w-full min-h-screen bg-richblack-900 font-inter">
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
