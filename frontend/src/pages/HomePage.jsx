import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow mb-20">
      {/* Logo / Title */}
      <h1 className="text-5xl lg:text-8xl font-bold mb-8 text-blue-600">
        FileKeep
      </h1>

      <p className="text-gray-500 mb-8 text-center max-w-md italic lg:text-xl">
        A simple, secure way to organize your folders and upload your files.
      </p>

      {/* Buttons */}
      <div className="flex space-x-6">
        <Link
          to="/login"
          className="px-6 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="px-6 py-3 rounded-full bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
