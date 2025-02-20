import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-richblack-900 text-richblack-5 px-4">
      <h1 className="text-[120px] font-bold leading-none">404</h1>
      <h2 className="text-3xl font-semibold mb-8">Page Not Found</h2>
      <p className="text-richblack-200 text-lg text-center mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <button className="bg-yellow-50 text-richblack-900 px-6 py-3 rounded-md font-semibold hover:scale-95 transition-all duration-200">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default Error;
