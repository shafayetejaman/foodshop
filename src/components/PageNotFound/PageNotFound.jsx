import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const PageNotFound = () =>
{
  const handleGoBack = () =>
  {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">Oops! Page not found</p>
        <div className="w-24 h-24 mx-auto mb-8">
          <svg
            className="w-full h-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <button
          onClick={handleGoBack}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center justify-center mx-auto"
        >
          <FaArrowLeft className="mr-2" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;